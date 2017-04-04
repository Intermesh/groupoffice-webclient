'use strict';

GO.module('GO.Core').component('goSelectPdfTemplates', {
	bindings: {
		goModuleName: '@',
		ngModel: '=',
		label:'@'
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
			
			this.onOpen = function() {
				return this.store.load();
			};
			
				

			this.addPdfTemplate = function () {
				
				var me = this;

				var pdfTemplate = new PdfTemplate(this.goModuleName);

				Dialog.show({
					editModel: pdfTemplate,
					templateUrl: 'core/components/pdftemplate/edit.html',
					controller: 'GO.Core.Components.PdfTemplate.EditController'
				}).then(function (dialog) {
					dialog.close.then(function (pdfTemplate) {
						if (pdfTemplate) {
							me.store.reload();
							me.ngModel = pdfTemplate;
						}
					});
				});
			};

		}],
	templateUrl: 'core/components/selectpdftemplate/component.html'
});
