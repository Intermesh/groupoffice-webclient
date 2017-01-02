'use strict';

GO.module('GO.Modules.GroupOffice.Tasks').controller('GO.Modules.GroupOffice.Tasks.Controller.Task', [
	'$scope',
	'$stateParams',
	function ($scope, $stateParams) {
		$scope.task.readIf($stateParams.taskId);
	}]);