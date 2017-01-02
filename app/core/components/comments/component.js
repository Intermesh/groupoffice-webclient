'use strict';

GO.module('GO.Core').component('goComments', {
	bindings: {
		goRoute: '@'
	},
	controller: [
		'$scope',
		'GO.Core.Components.Comment',
		'GO.Core.Services.Dialog',
		'$state',
		function ($scope, Comment, Dialog, $state) {

			this.$onInit = function() {
				this.store = (new Comment(this.goRoute)).getStore();
				this.store.load();
			};

//			this.edit = function (emailTemplate) {
//
//				if (!emailTemplate) {
//					emailTemplate = new Comment(this.goModuleName);
//					emailTemplate.addStore(this.store);					
//				}
//
//
//				Dialog.show({
//					editModel: emailTemplate,
//					templateUrl: 'core/components/emailtemplate/edit.html',
//					controller: 'GO.Core.Components.EmailTemplate.EditController'
//				}).then(function (dialog) {
//					dialog.close.then(function (emailTemplate) {
//						if (emailTemplate) {
//							$scope.store.reload();
//						}
//					});
//				});
//			};

		}],
	templateUrl: 'core/components/comments/component.html'
});