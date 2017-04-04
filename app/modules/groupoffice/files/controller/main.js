'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Main', [
		'$scope',
		'$state',
		'$http',
		'$mdSidenav',
		'$mdDialog',
		'$mdMenu',
		'GO.Modules.GroupOffice.Notifications.Services.Notifications',
		'GO.Core.Services.Application',
		'GO.Core.Services.ServerModules',
		'GO.Core.Services.ServerAPI',
		'GO.Core.Factories.Data.Store',
		'GO.Modules.GroupOffice.Files.Model.Browser',
		'GO.Modules.GroupOffice.Files.Model.Clipboard',
		'GO.Modules.GroupOffice.Files.Model.Node',
		function ($scope, $state, $http, $mdSidenav, $mdDialog,$mdMenu,Notifications, App,ServerModules, ServerAPI, Store, Browser,Clipboard, Node) {
			// The date that is currently viewed
			//$scope.$mdSidenav = $mdSidenav;
			$scope.flowInit = ServerAPI.getFlowInit();

			ServerModules.fetchModule('GO\\Modules\\GroupOffice\\Files\\Module').then(function (module) {
				$scope.permissions = module.permissions;
			});
			
			$scope.model = new Node('files', '*');
			$scope.nodeStore = $scope.model.getStore();

			$scope.starredFolder = $scope.model.getStore();
			$scope.starredFolder.$loadParams = {
				filter: {'starred':true},
				q:[['andWhere',{isDirectory:true}]]
			};
			$scope.starredFolder.load();

			$scope.mountStore = new Store('/mounts');
			$scope.mountStore.load();

			$scope.browser = new Browser($scope.nodeStore);
			$scope.browser.open({id:'home',isDirectory:true});
			$scope.clipboard = new Clipboard();

			$scope.showInfo = true;

			$scope.editDrive = function(path) {
				$mdDialog.show({
					controller: 'GO.Modules.GroupOffice.Files.DriveForm',
					templateUrl: 'modules/groupoffice/files/views/drive-form.html',
					parent: angular.element(document.body),
					scope: $scope.$new(),
					clickOutsideToClose:true
					//fullscreen: useFullScreen
				});
			};

			$scope.openMenu = function($mdMenu, ev) {
				//originatorEv = ev;
				$mdMenu.open(ev);
			 };
			$scope.addFolder = function(newFolder) {
				var folder = new Node();
				folder.addStore($scope.nodeStore);
				folder.name = newFolder;
				folder.isDirectory = true;
				folder.parentId = $scope.browser.currentDir().id;
				folder.save().then(function() {
					$scope.nodeStore.reload();
				});
			};

			$scope.toggleInfo = function() {
				$scope.showInfo = !$scope.showInfo;
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


		}]);
