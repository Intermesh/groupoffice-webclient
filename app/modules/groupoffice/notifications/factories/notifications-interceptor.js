

'use strict';

// register the interceptor as a service
angular.module('GO.Modules.GroupOffice.Notifications').factory('GO.Modules.GroupOffice.Notifications.Factories.NotifcationsInterceptor', [
	'GO.Modules.GroupOffice.Notifications.Services.NotificationsData',
	function(NotificationsData) {
  
	return {
		'response': function(response) {

			// Only apply the dispatcher to Json data responses
			var contentType = response.headers('Content-Type');
			if (contentType && contentType.indexOf('application/json') > -1) {
				// do something on success
				
				
				if(angular.isDefined(response.data.notificationCount)) {					
					NotificationsData.unseenCount = response.data.notificationCount;					
				}
			}
			return response;
		}
		
	};
}])
.value('notificationCount', 0)
.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('GO.Modules.GroupOffice.Notifications.Factories.NotifcationsInterceptor');
}]);
