'use strict';

GO.module('GO.Modules.GroupOffice.Users').component('goSelectUser', {
	bindings: {
		label: '@',
		user: '<',
		onChange: '&'
	},
	controller: [
		'GO.Modules.GroupOffice.Users.Model.User',
		function (User) {
			
			this.store = (new User).getStore({
				returnProperties: 'id,username,photoBlobId,lastLogin',
				orderColumn: 't.username',
				orderDirection: 'ASC'
			});

			//this.store.load();

			this.getUsers = function(input) {				
				return this.store.load({
					searchQuery: input
				}).then(function(result){
					return result.store.items;
				});
			};
			
			this.update = function() {
				this.onChange({user: this.user});
			};
//			
//			this.$onChanges = function(changesObj) {	
//				
//				console.log(changesObj.value.currentValue);
//				this.onChange({value: changesObj.value.currentValue, old: changesObj.value.previousValue});
//			};

		}],
	templateUrl: 'modules/groupoffice/users/components/selectuser/component.html'
});
