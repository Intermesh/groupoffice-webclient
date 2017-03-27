'use strict';

GO.module('GO.Core').component('goEmailTemplates', {
	bindings: {
		goModuleName: '@'
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Templates.Message',
		'GO.Core.Services.Dialog',
		'$state',
		'$http',
	'GO.Core.Services.ServerAPI',
		function ($scope, EmailTemplate, Dialog, $state, $http, ServerAPI) {

			this.$onInit = function() {
				this.store = (new EmailTemplate(this.goModuleName)).getStore();
				this.store.load();
			};
			
			var me = this;
			
			this.duplicate = function (emailTemplate) {
					
				$http.post(ServerAPI.url('templates/messages/' +encodeURIComponent(this.goModuleName)+ '/' + emailTemplate.id + '/duplicate')).then(function() {
					me.store.load();
				});
			
			};

			this.edit = function (emailTemplate) {

				if (!emailTemplate) {
					emailTemplate = new EmailTemplate(this.goModuleName);		
				}


				Dialog.show({
					editModel: emailTemplate,
					templateUrl: 'core/components/emailtemplate/edit.html',
					controller: 'GO.Core.Components.EmailTemplate.EditController'
				}).then(function (dialog) {
					dialog.close.then(function (emailTemplate) {
						if (emailTemplate) {
							me.store.reload();
						}
					});
				});
			};

		}],
	templateUrl: 'core/components/emailtemplate/component.html'
});