angular.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.File', [
	'$scope',
	'$state',
	'$stateParams',
	'$mdSidenav',
	'$mdDialog',
	'GO.Modules.GroupOffice.Files.Model.Node',
	function($scope, $state, $stateParams, $mdSidenav, $mdDialog, Node) {
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

		$scope.share = function() {
			$mdDialog.show({
				templateUrl: 'modules/groupoffice/files/views/share.html',
				scope: $scope.$new(),
				clickOutsideToClose: true,
				escapeToClose: true
			});
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
