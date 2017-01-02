'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Announcements').
	factory('GO.Modules.GroupOffice.Announcements.Announcement', ['GO.Core.Factories.Data.Model', function(Model) {

		var Announcement = GO.extend(Model, function () {						
			this.$parent.constructor.call(this, arguments);
		});

		Announcement.prototype.getStoreRoute = function() {
			return 'accounts';
		};
		
		return Announcement;
}]);

