
								
								
'use strict';

angular.module('GO.Core').factory('GO.Modules.GroupOffice.Messages.Models.Account', [
	'GO.Core.Factories.Data.Model',
	'GO.Modules.GroupOffice.Messages.Providers.AccountMapping',
	
	'$injector',
	function (Model, mappings,  $injector) {

		//Extend the base model and set default return proeprties
		var Account = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Account.prototype.getStoreRoute = function() {
			return 'messages/accounts';
		};
		
		Account.prototype.getAccountModel = function() {
			var clientModelClass = $injector.get(mappings[this.adaptor.className]);
			var account = new clientModelClass;									
			account.loadData(this.adaptor);			
			return account;
		};

		return Account;
	}]);

