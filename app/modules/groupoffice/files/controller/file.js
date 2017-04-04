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
				if(model.isDirectory && $scope.browser.currentDir().at !== 'trash') {
					$scope.browser.open(model);
				}
			};


		$scope.model.$baseParams = {
			returnProperties: "*"
		};

		$scope.model.read({id:$stateParams.id}).then(function(){  // TODO: ,'userId':userId
			selectNode($scope.model);
		});

		$scope.share = function() {
			$mdDialog.show({
				templateUrl: 'modules/groupoffice/files/views/share.html',
				scope: $scope.$new(),
				clickOutsideToClose: true,
				escapeToClose: true
			});
		};

		$scope.deleteNode = function(node) {
			var p = {};
			console.log($scope.browser.currentDir() );
			if($scope.browser.currentDir().at == 'trash') {
				p.hard = true;
			}
			node.delete(p).then(function() {
				if(node.isDirectory) {
					$scope.$parent.browser.up();
				} 
				if(p.hard) {
					$scope.nodeStore.reload();
				}
				$scope.model = null;
			});
		};

	}
]);
