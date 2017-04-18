'use strict';


angular.module('GO.Controllers').controller('GO.Controllers.ResetPasswordController', [
	'$scope',
	'$http',
	'GO.Core.Services.ServerAPI',
	'$stateParams',
	'$state',
	'$mdDialog',
	'GO.Core.Providers.Translate',
	function ($scope, $http, ServerAPI, $stateParams, $state, $mdDialog, Translate) {
		$scope.user = {
			id: $stateParams.userId
		};

		$scope.resetPassword = function () {
			return $http.post(ServerAPI.url('auth/users/' + $stateParams.userId + '/resetpassword', {
				token: $stateParams.token
			}), {data: $scope.user}).then(function (response) {

				if (response.data.success) {

					$mdDialog.show($mdDialog.alert().textContent(Translate.t("Your password has been reset. Continue to the login screen."))
									.ok(Translate.t('Continue'))).then(function () {
						$state.go('login');
					});

				}
			});
		};
	}]);
