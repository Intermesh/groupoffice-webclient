'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.Install', [
	'$scope',
	'$http',
	'GO.Core.Services.ServerAPI',
	'$state',
	'$mdDialog',
	function ($scope, $http, ServerAPI, $state, $mdDialog) {


		$http.get(ServerAPI.url('system/check')).then(function (result) {
			$scope.system = result.data;
		});
		$scope.install = function () {

			var url = $scope.system.databaseInstalled ? 'system/upgrade' : 'system/install';
			$http.get(ServerAPI.url(url)).then(function (result) {

				if (result.data.success) {
					$mdDialog.show($mdDialog.alert({
						title: $scope.system.databaseInstalled ? 'Upgrade was successful' : 'Installation was successful',
						textContent: 'Click on continue to login',
						ok: 'Continue'
					})).finally(function () {
						$state.go('login');
					});
				}


			});
		};



	}]
				);

