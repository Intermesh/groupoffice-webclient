'use strict';

GO.module('GO.Core').component('goNotificationStandard', {
	bindings: {
		model: '<',
		onOpen: '&',
		onDismiss: '&'
	},
	scope:true,
	transclude: true,
	templateUrl: 'modules/groupoffice/notifications/components/standard/component.html'
});
