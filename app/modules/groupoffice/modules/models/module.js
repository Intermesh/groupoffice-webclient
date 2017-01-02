'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Modules').
	factory('GO.Modules.GroupOffice.Modules.Module', ['GO.Core.Factories.Data.Model','$http','GO.Core.Providers.Translate', function(Model, $http, Translate) {

		var Module = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Module.prototype.getStoreRoute = function() {
			return 'modules';
		};
		
		Module.prototype.$keys = ['name'];
	
		return Module;
}]);

