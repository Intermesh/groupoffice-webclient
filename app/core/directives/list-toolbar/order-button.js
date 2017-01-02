


'use strict';

angular.module('GO.Core').directive('goOrderButton', [function () {
		return {
			restrict: 'E',
			require: "^goListToolbar",
			scope: true,
			link: function ($scope, element, $attrs, goListToolbar) {
				$scope.columns = $scope.$eval($attrs.columns);
				$scope.store = goListToolbar.getStore();
				
//				if(!$scope.store.$loadParams.sortDirection) {
//					$scope.store.$loadParams.sortDirection = 'ASC';
//				}
//
//				if(!$scope.store.$loadParams.sortColumn) {
//					for (var firstColumn in $scope.columns) break;
//
//					$scope.store.$loadParams.sortColumn = firstColumn;
//				}


			},
			templateUrl: 'core/directives/list-toolbar/order-button.html'
		};
	}]);
