'use strict';

angular.module('GO.Modules.GroupOffice.Messages').service('GO.Modules.GroupOffice.Messages.Services.AccountStore', [
	'GO.Modules.GroupOffice.Messages.Models.Account',
	function (Account) {
		
		var accounts = (new Account()).getStore();		
		accounts.load();
			
		return accounts;	
		
		
		
	}]);