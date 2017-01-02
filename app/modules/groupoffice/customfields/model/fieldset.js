'use strict';

angular.module('GO.Modules.GroupOffice.CustomFields').factory('GO.Modules.GroupOffice.CustomFields.Model.Fieldset', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		//Extend the base model and set default return proeprties
		var Fieldset = GO.extend(Model, function (modelName) {
			this.$parent.constructor.call(this, arguments);	
			
			this.modelName = modelName;
		});
		
		Fieldset.prototype.getStoreRoute = function () {
			return 'customfields/fieldsets/' + encodeURIComponent(this.modelName);
		};

		return Fieldset;
	}]);