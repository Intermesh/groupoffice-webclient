'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.ChangePasswordController', [
	'$scope',
	'$http',
	'GO.Core.Services.ServerAPI',
	'GO.Core.Services.Application',
	'GO.Core.Services.CurrentUser',
	'$mdToast',
	'GO.Core.Providers.Translate', 
	'$document',
	function ($scope, $http, ServerAPI, App, CurrentUser, $mdToast, Translate,$document) {

	
		$scope.user = {};
	
		$scope.changePassword = function () {
			
			return $http.put(ServerAPI.url('auth/users/' + CurrentUser.id + '/change-password'), $scope.user).then(function(result) {
				if(result.data.success) {
					$mdToast.show($mdToast.simple().content(Translate.t("Password changed successfully")));
				
					$scope.user = {};

					$scope.changePasswordForm.$setPristine();
					$scope.changePasswordForm.$setUntouched();
				}
				return result;
			});
		};

	}]);


