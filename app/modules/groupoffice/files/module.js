GO.module('GO.Modules.GroupOffice.Files', [])
	.run([
		'GO.Core.Services.Application',
		function (App) {

			App.currentUser.whenAuthenticated().then(function(){
				App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Files\\Module').then(function (module) {
					App.addLauncher('Files','files');
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
			.state('files.file', {
				templateUrl: 'modules/groupoffice/files/views/file.html',
				controller: 'GO.Modules.GroupOffice.Files.File',
				url: "/{id:[0-9]*}"
			});
			
		}
	]);