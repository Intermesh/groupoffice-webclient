'use strict';

GO.module('GO.Core').component('goSelectAccount', {
	bindings: {
		goCapability: '@',
		ngModel: '=',
		goOnAdd: '&?'
	},
	replace: true,
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Account',
		function ($scope, Account) {

			this.$onInit = function() {
				this.store = (new Account()).getStore({
					capability: this.goCapability || "",
					q: [
						['requirePermissionType', 'writeContents']
					]
				});				
				this.store.load();
			};
			var me = this;
			this.add = function() {
				me.goOnAdd().then(function(account) {
					if(account) {
						me.ngModel = account.id;
					}
				});
			};
			
//			this.onOpen = function() {
//				return this.store.load();
//			};

		}],
	templateUrl: 'core/components/selectaccount/component.html'
});
