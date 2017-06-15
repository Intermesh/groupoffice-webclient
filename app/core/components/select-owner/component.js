'use strict';

/**
 * 
 * @type type
 * 
 * @example
 * <div layout="row">
				<md-input-container class="md-icon-left">							
					<md-icon>account_box</md-icon>
				</md-input-container>
				
				<go-select-owner flex ng-model="model.owner"></go-select-owner>
					
			</div>
 */
GO.module('GO.Core').component('goSelectOwner', {
	bindings: {
		goCapability: '@',
		ngModel: '=',
		goOnAdd: '&?',
		label: '@?',
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
