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
		'GO.Core.Services.Application',
		'GO.Core.Services.ServerAPI',
		'GO.Core.Factories.Data.Store',
		'GO.Modules.GroupOffice.Files.Model.Browser',
		'GO.Modules.GroupOffice.Files.Model.Clipboard',
		'GO.Modules.GroupOffice.Files.Model.Node',
		function ($scope, $state, $http, $mdSidenav, $mdDialog,$mdMenu, App, ServerAPI, Store, Browser,Clipboard, Node) {
			// The date that is currently viewed
			//$scope.$mdSidenav = $mdSidenav;
			$scope.flowInit = ServerAPI.getFlowInit();
			

			$scope.model = new Node('files', '*');
			$scope.nodeStore = $scope.model.getStore();
			$scope.nodeStore.load();

			$scope.starredFolder = $scope.model.getStore();
			$scope.starredFolder.$loadParams = {
				filter: {'starred':true},
				q:[['andWhere',{isDirectory:true}]]
			};
			$scope.starredFolder.load();


			$scope.browser = new Browser($scope.nodeStore);
			$scope.clipboard = new Clipboard();

			$scope.showInfo = true;

			$scope.selectNode = function (model) {
				$scope.model = model;
				$scope.browser.goTo(model);
				if(model.isDirectory && $scope.browser.currentDir().at !== 'trash') {
					$scope.browser.open(model);
				}
			};

			$scope.openMenu = function($mdMenu, ev) {
				//originatorEv = ev;
				$mdMenu.open(ev);
			 };
			$scope.addFolder = function(newFolder) {
				var folder = new Node('files', '*');
				folder.name = newFolder;
				folder.isDirectory = true;
				folder.parentId = $scope.browser.currentDir().id || null;
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
				$scope.uploadStack.push(node.getAttributes());
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

					});
			};

			$scope.thumb = function(blobId) {
				return ServerAPI.thumbUrl(blobId, {w:132, h:132});
			};

		}]);
