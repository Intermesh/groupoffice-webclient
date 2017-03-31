GO.module('GO.Modules.GroupOffice.Files', [])
	.run([
		'GO.Core.Services.Application',
		function (App) {

			App.currentUser.whenAuthenticated().then(function(){
				App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Files\\Module').then(function (module) {
					App.addLauncher('Files','files',false,{icon:'folder'});
				});
			});

		}])
	.config([
		'$stateProvider', function ($stateProvider) {
			$stateProvider
			.state('files', {
				templateUrl: 'modules/groupoffice/files/views/main.html',
				controller: 'GO.Modules.GroupOffice.Files.Main',
				url: "/files?{path:[^/]*}"
			})
			.state('files.locations', {
				templateUrl: 'modules/groupoffice/files/views/drives.html',
				controller: 'GO.Modules.GroupOffice.Files.Drives',
				url: "/locations"
			})
			.state('files.locations.drive', {
				templateUrl: 'modules/groupoffice/files/views/drive.html',
				//controller: 'GO.Modules.GroupOffice.Files.Drive',
				url: "/drive"
			})
			.state('files.drive', {
				templateUrl: 'modules/groupoffice/files/views/files.html',
				controller: 'GO.Modules.GroupOffice.Files.File',
				url: "/{id:[0-9]*}"
			});
			
		}
	]);