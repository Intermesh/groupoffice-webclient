'use strict';

angular.module('GO.Core').factory('GO.Core.Factories.Models.Account', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		//Extend the base model and set default return proeprties
		var Account = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Account.prototype.$returnProperties = '*,groups';
		
		Account.prototype.getStoreRoute = function() {
			return 'accounts';
		};
		
		Account.prototype.save = function (getParams) {
			
			this.touchAttribute('modelName');//always send this
			
			return this.$parent.save.call(this, arguments); 
		};

		return Account;
	}]);
