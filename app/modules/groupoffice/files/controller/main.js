'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Main', [
		'$scope',
		'$state',
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
		function ($scope, $state, $http, $mdDialog,Notifications, CurrentUser, ServerAPI, Store, Browser,Clipboard, Node, Drive) {
			// The date that is currently viewed
			//$scope.$mdSidenav = $mdSidenav;
			$scope.flowInit = ServerAPI.getFlowInit();

			var filesModule = CurrentUser.getServerModule('GO\\Modules\\GroupOffice\\Files\\Module');		
			$scope.permissions = filesModule.permissions;

			
			$scope.model = new Node('files', '*');
			$scope.nodeStore = $scope.model.getStore();

			$scope.mountStore = new Store('mounts');
			$scope.mountStore.load();

			$scope.browser = new Browser($scope.nodeStore);
			$scope.clipboard = new Clipboard();

			$scope.showInfo = true;
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
			$scope.addFolder = function(newFolder) {
				var folder = new Node();
				folder.name = newFolder;
				folder.isDirectory = true;
				folder.parentId = $scope.browser.currentDir().id;
				folder.save().then(function() {
					$scope.nodeStore.reload();
				});
			};

			$scope.uploadStack = [];

			$scope.uploadSuccess = function($file, $message) { //TODO
				var response = angular.fromJson($message);
				console.log(response);
				var node = new Node();
				node.name = $file.name;
				node.relativePath = $file.relativePath;
				node.parentId = $scope.browser.currentDir().id;
				node.blobId = response.data.blobId;
				$scope.uploadStack.push(node.getAttributes());
			};

			$scope.onAddFiles = function($files, $event, $flow) {
				for(var f in $files) {
					console.log($files[f]);
					Notifications.add({
						template: '<div>Uploading {{name}}</div>',
						locals: $files[f]
	//					controller: 'GO.'
					});
				}
				Notifications.showPanel();
			};
			$scope.onFileProgress = function($file, $flow) {
				console.log($file);
			};

			$scope.uploadCommit = function() { //all files are uploaded

				$http.post(ServerAPI.url('files'), {data: $scope.uploadStack})
					.then(function (response) {
						//var data = response.data.data;
						if (response.data.success) {
							$scope.nodeStore.reload();
						} else {
							console.log('BAD');
						}
						Notifications.closePanel();
					});
			};

			$scope.thumb = function(blobId) {
				return ServerAPI.thumbUrl(blobId, {w:132, h:132});
			};
//			if($state.is('files')) {
//				$state.go('files.storage');
//			}
			if($state.is('files')) {
				$scope.browser.goTo('home');
			}


		}]);
