'use strict';

// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Modules', ['GO.Core'])
.run([
		'GO.Core.Services.Application',
		function (App) {
			
			App.currentUser.whenAuthenticated().then(function(){
				if(App.currentUser.isAdmin) {
					App.addLauncher('Server modules', 'modules', false, {icon:'view_module'});
				}
			});

		}])
	.config(['$stateProvider', function ($stateProvider) {
				$stateProvider
						.state('modules', {
							url:'/modules',
							templateUrl: 'modules/groupoffice/modules/views/main.html',
							controller: 'GO.Modules.GroupOffice.Modules.MainController'
						})
						.state('modules.module', {
							url: "/{moduleName:[^/]*}",
							templateUrl: 'modules/groupoffice/modules/views/module.html',
							controller: 'GO.Modules.GroupOffice.Modules.ModuleController'
						});
			}]);
