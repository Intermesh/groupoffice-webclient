'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Notifications').factory('GO.Modules.GroupOffice.Notifications.Model.Notification', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		var Notification = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Notification.prototype.getStoreRoute = function () {
			return 'notifications';
		};
		
		
		return Notification;
	}]);

