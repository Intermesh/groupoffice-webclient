'use strict';

GO.module('GO.Core').controller('GO.Core.Components.Users.ForcePasswordChange', [
	'$scope',
	'$q',
	'currentPassword',
	'GO.Core.Services.CurrentUser',
	'$mdDialog',
	function ($scope, $q, currentPassword, CurrentUser, $mdDialog) {
		$scope.user = CurrentUser;
		
		$scope.save = function(){
			$scope.user.ChangePassword(currentPassword).then(function(success){
				if(success){
					$mdDialog.hide();
				}
			});
		};
		
	}]);