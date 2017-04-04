'use strict';

angular.module('GO.Core').factory('GO.Core.Factories.Data.Resource', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		var Resource = GO.extend(Model, function (storeRoute, returnProperties, keys) {
			this.$parent.constructor.call(this, arguments);
			
			this.$storeRoute = storeRoute;
			
			if(returnProperties){
				this.$returnProperties = returnProperties;
			}
			
			this.$keys = keys || ['id'];
		});
		
		delete Resource.prototype.$keys;
		
		Resource.prototype.getStoreRoute = function() {
			return this.$storeRoute;
		};

		return Resource;
	}]);

