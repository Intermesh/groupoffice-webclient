'use strict';

//Use GO.module instead of angular.module so it will be added to the app dependencies
GO.module('GO.Modules.Tutorial.Bands', ['GO.Core'])
	
	.run([
		'GO.Core.Services.Application',
		function (App) {

			App.currentUser.whenAuthenticated().then(function(){
				App.serverModules.fetchModule('UX\\Modules\\Bands\\Module').then(function (module) {
					App.addLauncher('Bands','bands');
					App.addSettingsOption('settings.bands', 'Bands', 'mdi-music-note');
				});
			});

		}])
	.config([
		'$stateProvider',
		function ($stateProvider) {
			$stateProvider
							.state('bands', {
								url: "/bands",
								templateUrl: 'ux/tutorial/modules/groupoffice/bands/views/main.html',
								controller: 'GO.Modules.Tutorial.Bands.Controller.Main',
								data: {
									noAuth: false //optional, set to true to disable authentication. It defaults to false.
								}
							})
							.state('bands.band', {
								url: "/{bandId:[0-9]*}",
								templateUrl: 'ux/tutorial/modules/groupoffice/bands/views/band.html',
								controller: 'GO.Modules.Tutorial.Bands.Controller.Band'
							})
							.state('settings.bands', {
								url: "/bands",
								templateUrl: 'ux/tutorial/modules/groupoffice/bands/views/settings/form.html'
							})
							;
		}]);
