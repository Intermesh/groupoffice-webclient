'use strict';

GO.module('GO.Core').component('goPdfTemplates', {
	bindings: {
		goModuleName: '@'
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Templates.Pdf',
		'GO.Core.Services.Dialog',
		'$state',
		function ($scope, PdfTemplate, Dialog, $state) {

			this.$onInit = function() {
				this.store = (new PdfTemplate(this.goModuleName)).getStore();
				this.store.load();
			};
			
			var me = this;

			this.edit = function (pdfTemplate) {

				if (!pdfTemplate) {
					pdfTemplate = new PdfTemplate(this.goModuleName);
					pdfTemplate.addStore(this.store);
					
				}


				Dialog.show({
					editModel: pdfTemplate,
					templateUrl: 'core/components/pdftemplate/edit.html',
					controller: 'GO.Core.Components.PdfTemplate.EditController'
				}).then(function (dialog) {
					dialog.close.then(function (pdfTemplate) {
						if (pdfTemplate) {
							me.store.reload();
						}
					});
				});
			};

		}],
	templateUrl: 'core/components/pdftemplate/component.html'
});