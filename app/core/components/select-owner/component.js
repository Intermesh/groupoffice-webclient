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
		ngModel: '=',		
		label: '@?',
		q: '<?'
	},
	replace: true,
	controller: [
		'$scope',
		'GO.Modules.GroupOffice.Users.Model.Group',
		function ($scope, Group) {

			this.$onInit = function () {

				

				this.store = (new Group()).getStore({
					returnProperties: "id,name",
					limit: 20,
					q: null
				});

			};
			var me = this;

			this.getGroups = function (input) {
				var params = {
					searchQuery: input
				};				

				if (this.q) {
					me.store.$loadParams.q = this.q;
				}

				return me.store.load(params).then(function (result) {
					return result.store.items;
				});
			};
			
			this.groupSearchText = "";

		}],
	templateUrl: 'core/components/select-owner/component.html'
});
