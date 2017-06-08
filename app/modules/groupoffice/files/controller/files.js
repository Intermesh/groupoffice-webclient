'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Files', [
		'$scope',
		'$stateParams',
		'GO.Modules.GroupOffice.Files.Model.Node',
		function ($scope, $stateParams, Node) {
			$scope.browser.filter($stateParams.filter);

			$scope.addFolder = function(newFolder) {
				var folder = new Node();
				folder.name = newFolder;
				folder.isDirectory = true;
				folder.parentId = $scope.browser.currentDir;
				folder.save().then(function(resp) {
					$scope.nodeStore.reload();
				});
			};


		}]);
