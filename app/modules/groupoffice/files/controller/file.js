angular.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.File', [
	'$scope',
	'$state',
	'$stateParams',
	'$mdSidenav',
	'GO.Modules.GroupOffice.Files.Model.Node',
	function($scope, $state, $stateParams, $mdSidenav, Node) {
		$scope.model = $scope.$parent.model;
		$scope.clipboard = $scope.$parent.clipboard;

		$scope.model.$baseParams = {
			returnProperties: "*"
		};

		$scope.model.read({id:$stateParams.id}).then(function(){  // TODO: ,'userId':userId
			//$mdSidenav('fileinfo').open();
		});

		$scope.close = function() {
			$mdSidenav('fileinfo').close();
		};

		$scope.deleteNode = function(node) {
			node.delete().then(function() {
				if(node.isDirectory) {
					$scope.$parent.browser.up();
				}
			});
		};

	}
]);
