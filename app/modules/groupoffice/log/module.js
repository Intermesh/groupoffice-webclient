'use strict';

// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Log', ['GO.Core'])
.run([
		'GO.Core.Services.Application',
		function (App) {
			
			App.currentUser.whenAuthenticated().then(function () {
				if(App.currentUser.isAdmin) {
					App.addLauncher('Log','log',false, {icon:'receipt'});
				}
			});
			
		}])
	.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('log', {
							url:'/log',
							templateUrl: 'modules/groupoffice/log/views/main.html',
							controller: 'GO.Modules.GroupOffice.Log.MainController'
						});
			}]);
