'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Files', [
		'$scope',
		'$stateParams',
		function ($scope, $stateParams) {
			$scope.browser.filter($stateParams.filter);

		}]);
