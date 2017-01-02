'use strict';

angular.module('GO.Modules.GroupOffice.Files').
factory('GO.Modules.GroupOffice.Files.Model.Node', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.ServerAPI',
	function (Model, ServerAPI) {
		var t = {
			Other: 0,
			Document: 1,
			Image: 2,
			Video: 3,
			Audio: 4,
			Folder: 1000
		};

		//Extend the base model and set default return proeprties
		var Node = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		Node.prototype.$returnProperties = "*,nodeUser";
		Node.prototype.$keys = ['id'];
		Node.prototype.getStoreRoute = function() {
			return 'files';
		};
		Node.prototype.cut = function() {
			console.log('cut');
		};
		Node.prototype.copy = function() {
			console.log('copy');
		};
		Node.prototype.paste = function() {
			console.log('paste');
		};
		Node.prototype.share = function() {
			console.log('share');
		};

		Node.prototype.isDocument = function() {
			return (this.type == t.Document);
		};
		Node.prototype.isImage = function() {
			return (this.type == t.Image);
		};
		Node.prototype.isPlayable = function() {
			return (this.type == t.Video || this.type == t.Audio);
		};

		Node.prototype.getBlob = function() {
			return ServerAPI.url('download/'+this.blobId);
		};
		
		Node.prototype.getIcon = function() {
			if(this.isDirectory) {
				return 'folder';
			}
			switch(this.type) {
				case t.Other: return 'insert_drive_file';
				case t.Document: return 'description';
				case t.Image: return 'image'; // TODO make thumb
				case t.Video: return 'movie';
				case t.Audio: return 'music_video';
				case t.Folder: return 'folder';
			}
			return 'insert_drive_file';
		};

		return Node;
	}]);