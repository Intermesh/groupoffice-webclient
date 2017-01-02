'use strict';

GO.module('GO.Modules.GroupOffice.Users').controller('GO.Modules.GroupOffice.Users.Controller.User', [
	'$scope',
	'$stateParams',
	'GO.Core.Services.Application',
	function ($scope, $stateParams, App) {

		$scope.user.read($stateParams.userId).then(function () {

		});
		
		$scope.currentUser = App.currentUser;

	}]);
