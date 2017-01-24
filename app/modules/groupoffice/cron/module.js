'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Cron', ['GO.Core'])
	.run([
		'GO.Core.Services.Application',
		function (App) {
		

			App.currentUser.whenAuthenticated().then(function(){					
					
					App.addSettingsOption('settings.cron', 'Scheduled tasks', 'schedule', true);						
										
			});
		}])
	.config(['$stateProvider', function ($stateProvider) {


		$stateProvider
						.state('settings.cron', {
							url: "/cron",
							templateUrl: 'modules/groupoffice/cron/view/main.html',
							controller: 'GO.Modules.GroupOffice.Cron.Controller.Main'
						});
	}]);

