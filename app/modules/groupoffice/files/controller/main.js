'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Main', [
		'$scope',
		'$state',
		'$stateParams',
		'$http',
		'$mdDialog',
		'GO.Modules.GroupOffice.Notifications.Services.Notifications',
		'GO.Core.Services.CurrentUser',
		'GO.Core.Services.ServerAPI',
		'GO.Core.Factories.Data.Store',
		'GO.Modules.GroupOffice.Files.Model.Browser',
		'GO.Modules.GroupOffice.Files.Model.Clipboard',
		'GO.Modules.GroupOffice.Files.Model.Node',
		'GO.Modules.GroupOffice.Files.Model.Drive',
		function ($scope, $state,$stateParams, $http,$mdDialog,Notifications, CurrentUser, ServerAPI, Store, Browser,Clipboard, Node, Drive) {
			// The date that is currently viewed
			//$scope.$mdSidenav = $mdSidenav;
			$scope.flowInit = ServerAPI.getFlowInit();

			var filesModule = CurrentUser.getServerModule('GO\\Modules\\GroupOffice\\Files\\Module');		
			$scope.permissions = filesModule.permissions;

			
			$scope.model = new Node('files', '*');
			$scope.nodeStore = $scope.model.getStore();

			$scope.browser = new Browser($scope.nodeStore);
			$scope.clipboard = new Clipboard($scope.nodeStore);

			$scope.mountStore = new Store('mounts');
			$scope.mountStore.load().then(function(xhr) {
				var index = xhr.store.findIndexByAttribute('id', xhr.response.data.home);
				$scope.browser.home = xhr.store.items[index];
				if($state.is('files')) {
					$state.go('files.list', {filter:'home', id:$scope.browser.home.rootId});
				}
			});
			$scope.drive = new Drive();

			$scope.editDrive = function(path) {
				function openDialog() {
					$mdDialog.show({
						controller: 'GO.Modules.GroupOffice.Files.DriveForm',
						templateUrl: 'modules/groupoffice/files/views/drive-form.html',
						parent: angular.element(document.body),
						scope: $scope.$new(),
						clickOutsideToClose:true
						//fullscreen: useFullScreen
					});
				};
				if(!path) {
					$scope.drive = new Drive();
					openDialog();
				} else {
					$scope.drive.read({id:path}).then(function() {
						openDialog();
					});
				}
			};

			$scope.openMenu = function($mdMenu, ev) {
				//originatorEv = ev;
				$mdMenu.open(ev);
			 };

			$scope.uploadStack = [];
			var overwriteFileNames = [];

			$scope.onAddFiles = function($files, $event, $flow) {

				for(var e in $files) { // check exists
					for(var i in $scope.nodeStore.items) {
						if($files[e].name == $scope.nodeStore.items[i].name) {
							overwriteFileNames.push($scope.nodeStore.items[i].name);
						}
					}
				}
				if(overwriteFileNames) {

				}

				for(var f in $files) {
					Notifications.add({
						template: '<div><md-icon>file_upload</md-icon><h2>File transfer &bull; {{ file.progress()*100 | number:0}}%</h2>\
						<h3>{{file.name}}<sub>{{file.progress()==1?"Done":file.timeRemaining()+ " seconds left"}}</sub></h3>\
						<md-progress-linear value="{{file.progress()*100}}"></md-progress-linear> </div>',
						locals: {file:$files[f]}
	//					controller: 'GO.'
					});
				}
				Notifications.showPanel();
			};

			$scope.onFilesSubmitted = function($flow) {
				if(overwriteFileNames.length === 0) {
					$flow.upload();
				} else {
					var confirm =$mdDialog.confirm()
						.title('Bestand(en) met deze naam bestaan al')
						.textContent("Wil u de bestanden overschrijven of overslaan?")
						.ok('Overschrijven')
						.cancel('Overslaan');
					$mdDialog.show(confirm).then(function() {
						$flow.upload();
					},function() {
						for(var f in $flow.files) {
							if(overwriteFileNames.indexOf($flow.files[f].name) > -1) {
								$flow.files[f].cancel();
								$flow.removeFile($flow.files[f]);
							}
						}
						overwriteFileNames = []; //nothing may be overwritten
						if($flow.files.length > 0) {
							$flow.upload();
						} else {
							Notifications.closePanel();
						}
					});
				}
			};

			$scope.uploadSuccess = function($file, $message) { //TODO
				var response = angular.fromJson($message);
				var node = new Node();
				node.name = $file.name;
				node.relativePath = $file.relativePath;
				node.parentId = $scope.browser.currentDir;
				node.blobId = response.data.blobId;
				$scope.uploadStack.push(node.getAttributes());
			};

			$scope.uploadComplete = function() { //all files are uploaded

				if($scope.uploadStack.length === 0) {
					Notifications.closePanel();
					return true;
				}
				$http.post(ServerAPI.url('files'), {data: $scope.uploadStack, overwrites: overwriteFileNames})
					.then(function (response) {
						//var data = response.data.data;
						
						if (response.data.success) {
							$scope.nodeStore.reload();
						} else {
							console.log('Failed saving files');
						}
						Notifications.closePanel();
					}).finally(function() {
						$scope.uploadStack = [];
						overwriteFileNames = [];
					});
				return true;
			};

			function saveNodes(data, overwrites) {

			}

			$scope.thumb = function(blobId) {
				return ServerAPI.thumbUrl(blobId, {w:132, h:132});
			};

		}]);
