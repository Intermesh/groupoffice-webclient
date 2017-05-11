'use strict';

GO.module('GO.Core').component('goSelectOwner', {
	bindings: {
		goCapability: '@',
		ngModel: '=',
		goOnAdd: '&?',
		q: '<?'
	},
	replace: true,
	controller: [
		'$scope',
		'GO.Modules.GroupOffice.Users.Model.Group',
		function ($scope, Account) {

			this.$onInit = function () {

				var q = [
					['requirePermissionType', 'writeContents']
				];

				if (this.q) {
					q = q.concat(this.q);
				}

				this.store = (new Account()).getStore({
					returnProperties: "id,name",
					limit: 20,
					q: q
				});

			};
			var me = this;

			this.getGroups = function (input) {
				var params = {
					searchQuery: input
				};

				return me.store.load(params).then(function (result) {
					return result.store.items;
				});
			};
			
			this.groupSearchText = "";

		}],
	templateUrl: 'core/components/select-owner/component.html'
});
