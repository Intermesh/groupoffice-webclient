'use strict';

GO.module('GO.Core').component('goNotificationsPanel', {
	templateUrl: 'modules/groupoffice/notifications/components/panel/component.html',
	controller: [	
		
		'GO.Modules.GroupOffice.Notifications.Services.Notifications',
		function (  Notifications) {

					
			this.notifications = Notifications;
		}]
});
