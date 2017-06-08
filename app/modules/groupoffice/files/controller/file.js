angular.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.File', [
	'$scope',
	'$state',
	'$stateParams',
	'$mdSidenav',
	'$mdDialog',
	'GO.Modules.GroupOffice.Files.Model.Node',
	function($scope, $state, $stateParams, $mdSidenav, $mdDialog, Node) {

		var selectNode = function (model) {
			$scope.model = model;
			$scope.browser.goTo(model);
		};

		$scope.model.$baseParams = {
			returnProperties: "*"
		};

		$scope.model.read({id:$stateParams.id}).then(function(){  // TODO: ,'userId':userId
			selectNode($scope.model);
		});

		$scope.deleteNode = function(node) {

			node.delete().then(function() {
				if(node.isDirectory) {
					$scope.$parent.browser.up();
				} 
				$scope.nodeStore.reload();
				$scope.model = null;
			});
		};

	}
]);
