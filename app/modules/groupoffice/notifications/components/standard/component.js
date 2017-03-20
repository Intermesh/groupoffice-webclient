'use strict';

GO.module('GO.Core').component('goNotificationStandard', {
	bindings: {
		model: '<'
	},
	controller: [
		'GO.Modules.GroupOffice.Notifications.Services.Notifications',
		function (Notifications) {
			this.notifications = Notifications;
		}],
	scope: true,
	transclude: true,
	templateUrl: 'modules/groupoffice/notifications/components/standard/component.html'
});
