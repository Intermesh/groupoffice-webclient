'use strict';

angular.module('GO.Modules.GroupOffice.Contacts').factory('GO.Modules.GroupOffice.Contacts.Model.Account', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		//Extend the base model and set default return proeprties
		var Account = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Account.prototype.$returnProperties = '*,groups';

		Account.prototype.getStoreRoute = function () {
			return 'accounts';
		};
		
		return Account;
	}]);
