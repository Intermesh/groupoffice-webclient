'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Main', [
		'$scope',
		'$state',
		'$mdSidenav',
		'$mdDialog',
		'GO.Core.Services.Application',
		'GO.Core.Services.ServerAPI',
		'GO.Core.Factories.Data.Store',
		'GO.Modules.GroupOffice.Files.Model.Browser',
		'GO.Modules.GroupOffice.Files.Model.Clipboard',
		'GO.Modules.GroupOffice.Files.Model.Node',
		function ($scope, $state, $mdSidenav, $mdDialog, App, ServerAPI, Store, Browser,Clipboard, Node) {
			// The date that is currently viewed
			//$scope.$mdSidenav = $mdSidenav;
			$scope.flowInit = ServerAPI.getFlowInit();
			

			$scope.model = new Node('files', '*');
			$scope.nodeStore = $scope.model.getStore();
			$scope.nodeStore.load();

			$scope.browser = new Browser($scope.nodeStore);
			$scope.clipboard = new Clipboard();

			$scope.showInfo = true;

			$scope.selectNode = function (model) {
				$scope.model = model;
				$scope.browser.goTo(model);
				if(model.isDirectory) {
					$scope.browser.open(model);
				}
			};

			$scope.addFolder = function() {
				var folder = new Node('files', '*');
				folder.name = 'New folder'; //todo
				folder.isDirectory = true;
				folder.save();
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
				$scope.uploadStack.push(node);
			};

			$scope.uploadCommit = function() { //all files are uploaded
				var node;
				while(node = $scope.uploadStack.pop()) {
					console.log(node);
					node.save();
				}
				setTimeout(function(){
					// Todo save all files at ones and then reload store
					$scope.nodeStore.reload();
				},400);
				
			};

			$scope.thumb = function(blobId) {
				return ServerAPI.thumbUrl(blobId, {w:132, h:132});
			};

			$scope.openPermissionDialog = function (path, group, permission) {

				$scope.model.read({'path':path,'group':group});
				
				$mdDialog.show({
					controller: 'GO.Modules.GroupOffice.Files.PermissionForm',
					templateUrl: 'modules/groupoffice/files/views/permission-form.html',
					parent: angular.element(document.body),
					scope: $scope.$new(),
					hasBackdrop: true,
					clickOutsideToClose:true
					//fullscreen: useFullScreen
				})
				.then(function(answer) {
				  if(manmanmna) {
						$scope.eventStore.reload();
					}
				});

			};

		}]);
