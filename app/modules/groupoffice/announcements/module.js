'use strict';

// Declare app level module which depends on views, and components
angular.module('GO.Modules.GroupOffice.Announcements', ['GO.Core'])
	//Register the module
	.run([
		'GO.Core.Services.Application',
		function (App) {
			
			App.currentUser.whenAuthenticated().then(function(){
				App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Announcements\\Module').then(function (module) {
					
					App.addLauncher('Announcements', 'announcements');
				});
			});

		}])
	.config(['$stateProvider', function ($stateProvider) {
			// Now set up the states
			$stateProvider
							.state('announcements', {
								url: '/announcements',
								templateUrl: 'modules/groupoffice/announcements/views/main.html',
								controller: 'GO.Modules.GroupOffice.Announcements.AnnouncementController'
							});
		}]);
