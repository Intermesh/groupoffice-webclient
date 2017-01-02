'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Users').
	factory('GO.Modules.GroupOffice.Users.Model.Group', ['GO.Core.Factories.Data.Model', function(Model) {

		var Group = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Group.prototype.getStoreRoute = function() {
			return 'auth/groups';
		};
		return Group;
}]);

