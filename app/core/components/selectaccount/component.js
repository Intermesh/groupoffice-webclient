'use strict';

GO.module('GO.Core').component('goSelectAccount', {
	bindings: {
		goCapability: '@',
		ngModel: '=',
		goOnAdd: '&?',
		q: '<?'
	},
	replace: true,
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Account',
		function ($scope, Account) {

			this.$onInit = function() {
				
				var q = [
					['requirePermissionType', 'writeContents']
				];

				if(this.q){
					q = q.concat(this.q);
				}
				
				this.store = (new Account()).getStore({
					capability: this.goCapability || "",
					q: q
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
		

		}],
	templateUrl: 'core/components/selectaccount/component.html'
});
