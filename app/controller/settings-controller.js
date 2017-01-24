'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.SettingsController', [
	'$scope',
	'$http',
	'GO.Core.Services.ServerAPI',
	'GO.Core.Services.Application',
	'GO.Core.Services.CurrentUser',
	function ($scope, $http, ServerAPI, App, CurrentUser) {

		$scope.settingsOptions = App.settingsOptions;
		$scope.adminSettingsOptions = App.adminSettingsOptions;

		$scope.user = {
			currentPassword: "",
			newPassword: ""
		};
		
		$scope.currentUser = CurrentUser;		
	}]);

