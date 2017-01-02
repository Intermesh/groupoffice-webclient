'use strict';

// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Notifications', ['GO.Core'])
.run([
		'GO.Core.Services.Application',
		function (App) {

//			App.addLauncher('Notifications','notifications',false, {icon:'notifications'});
			
		}])
	.config(['$stateProvider', function ($stateProvider) {
//				$stateProvider
//						.state('notifications', {
//							url:'/notifications',
//							templateUrl: 'modules/groupoffice/notifications/views/main.html',
//							controller: 'GO.Modules.GroupOffice.Notifications.MainController'
//						});
			}]);
