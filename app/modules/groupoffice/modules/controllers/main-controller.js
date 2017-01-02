'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Modules').
	controller('GO.Modules.GroupOffice.Modules.MainController', [
		'$scope',
		'GO.Modules.GroupOffice.Modules.Module',
		'$state',
		function ($scope, Module, $state) {
		//Will be used in child scope. We define it here so we can access
		//the properties if needed in the future.
		//Child scopes automatically inherit properties of the parents but
		//not the other way around.
		$scope.module = new Module();

		$scope.store = $scope.module.getStore({
			returnProperties: "name,installed,moduleInformation,icon"
		});
		$scope.store.$storeRoute = 'modules/all';

		$scope.selectModule = function (module) {
			$state.go("modules.module", {moduleName: module.name});
		};

}]);