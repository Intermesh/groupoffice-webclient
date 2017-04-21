'use strict';

GO.module('GO.Core').component('goSelectAccount', {
	bindings: {
		goCapability: '@',
		ngModel: '='
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Account',
		function ($scope, Account) {

			this.$onInit = function() {
				this.store = (new Account()).getStore({
					capability: this.goCapability || "",
					q: [
						['requirePermissionType', 'update']
					]
				});				
				this.store.load();
			};
			
//			this.onOpen = function() {
//				return this.store.load();
//			};

		}],
	templateUrl: 'core/components/selectaccount/component.html'
});
