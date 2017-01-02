'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Users').factory('GO.Modules.GroupOffice.Users.Model.User', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.ServerAPI',
	function (Model, ServerAPI) {

		var User = GO.extend(Model, function () {

			this.$parent.constructor.call(this, arguments);

		});
		
		User.prototype.$returnProperties = '*,groups';

		User.prototype.getStoreRoute = function () {
			return 'auth/users';
		};


		return User;
	}]);

