'use strict';

// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Users', ['GO.Core']).run([
	'GO.Core.Services.Application',
	function (App) {		

		App.currentUser.whenAuthenticated().then(function () {
			App.serverModules.fetchModule('GO\\Core\\Users\\Module').then(function (module) {
				if (module.permissions.read) {
					App.addLauncher('Users', 'users',false,{icon:'people'});
				}
			});


			App.addSettingsOption('settings.change-password', 'Change password', 'lock');

		});
	}]).config(['$stateProvider', function ($stateProvider) {

		// Now set up the states
		$stateProvider
						.state('users', {
							templateUrl: 'modules/groupoffice/users/views/main.html',
							controller: 'GO.Modules.GroupOffice.Users.Controller.Main',
							url: "/users"
						})

						.state('users.user', {
							url: "/{userId:[0-9]*}",
							controller: 'GO.Modules.GroupOffice.Users.Controller.User',
							templateUrl: 'modules/groupoffice/users/views/user.html'
						})
						.state('settings.change-password', {
							url: "/change-password",
							controller: 'GO.Controllers.ChangePasswordController',
							templateUrl: 'modules/groupoffice/users/views/settings/change-password.html'
						});
	}]);
