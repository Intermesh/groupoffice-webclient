'use strict';

GO.module('GO.Core').component('goComments', {
	bindings: {
		goRoute: '@'
	},
	controller: [
		'GO.Core.Components.Comment',

		'$http',
		'GO.Core.Services.ServerAPI',
		function (Comment, $http, ServerAPI) {

			this.$onInit = function () {
				this.store = (new Comment(this.goRoute)).getStore();
				this.store.load();

				this.newComment = new Comment(this.goRoute);
				this.newComment.attachments = [];
			};

			this.addComment = function () {
				var ctrl = this;
				this.newComment.save().then(function () {
					ctrl.newComment = new Comment(ctrl.goRoute);
					ctrl.newComment.attachments = [];
					ctrl.store.load();
				});
			};

//			this.onImagePaste =function (dataURL, editor) {				
//				editor.composer.commands.exec("insertImage", {src: dataURL, alt: "Pasted image"});					
//			};


			this.onImagePaste = function (blob, editor) {
				var ctrl = this;

				var form = new FormData();
				form.append("file", blob, blob.type.replace(/\//, '.'));

				$http.post(ServerAPI.url('upload'), form, {
					transformRequest: angular.identity, //this will pass the formdata object as is.
					headers: {'Content-Type': undefined} //Content-Type will be filled by the form
				}).then(function (result) {

					var thumbUrl = ServerAPI.url('thumb/' + result.data.data.blobId, {w: 100, h: 100, zc: 1});
					var downloadUrl = ServerAPI.url('download/' + result.data.data.blobId, {w: 100, h: 100, zc: 1});


					ctrl.newComment.attachments.push({
						blobId: result.data.data.blobId,
						name: result.data.data.name
					});

					editor.composer.commands.exec("insertHTML", '<a target="_blank" href="' + downloadUrl + '"><img src="' + thumbUrl + '" alt="pasted image" /></a>');
				});
			};


			// FILE UPLOAD
			this.flowInit = ServerAPI.getFlowInit();

			this.uploadSuccess = function ($file, $message) {
				var result = angular.fromJson($message);
				//$file.serverFile = result.data.name;
				this.newComment.attachments.push({
					blobId: result.data.blobId,
					name: $file.name
				});
			};

			this.removeAttachment = function (index) {
				this.newComment.attachments.splice(index, 1);
			};


		}],
	templateUrl: 'core/components/comments/component.html'
});