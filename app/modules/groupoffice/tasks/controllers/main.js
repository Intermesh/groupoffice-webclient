'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Tasks').controller('GO.Modules.GroupOffice.Tasks.Controller.Main', [
	'$scope',
	'GO.Modules.GroupOffice.Tasks.Model.Task',
	'GO.Core.Services.Dialog',
	'$state',
	'GO.Core.Services.CurrentUser',
	function ($scope, Task, Dialog, $state, CurrentUser) {


		$scope.task = new Task();


		$scope.store = $scope.task.getStore({
			orderColumn: 'dueAt',
			returnProperties: "id,description,dueAt,deleted,completedAt"
		});
		
		
		$scope.filters ={
			status : 'incomplete',
			assigned: 'mine',
			tags: []
		};
		
		
		$scope.updateFilter = function(name, value) {
			$scope.filters[name] = value;			
			load();
		};		
		
		function load() {

			$scope.store.$loadParams.q = [];
			
			switch($scope.filters.assigned) {
				case 'mine':
					$scope.store.$loadParams.q.push(['andWhere',{'assignedTo': CurrentUser.id}]);						
					break;
					
				case 'createdforothers':
					$scope.store.$loadParams.q.push(['andWhere',{'createdBy': CurrentUser.id}]);
					$scope.store.$loadParams.q.push(['andWhere',['!=', {'assignedTo': CurrentUser.id}]]);
					break;
				
			}
			
			if($scope.filters.tags.length){
				$scope.store.$loadParams.q.push(['joinRelation','tags']);
				$scope.store.$loadParams.q.push(['andWhere', {'tags.id': $scope.filters.tags}]);
			}
			
			switch($scope.filters.status) {

				case 'complete':
					$scope.store.$loadParams.q.push(['andWhere', ['!=', {'completedAt': null}]]);						
					break;

				case 'incomplete':
					$scope.store.$loadParams.q.push(['andWhere',  {'completedAt': null}]);						
					break;

				case 'late':
					$scope.store.$loadParams.q.push(['andWhere', ['<',{'dueAt': new Date() }]]);
					$scope.store.$loadParams.q.push(['andWhere', {'completedAt': null }]);
					break;
			}
			
			$scope.store.load();	
		};

		load();

		$scope.edit = function (task) {

			if (!task) {
				task = new Task();
				task.addStore($scope.store);
			}

			Dialog.show({
				editModel: task,
				templateUrl: 'modules/groupoffice/tasks/views/task-edit.html',
				controller: 'GO.Modules.GroupOffice.Tasks.Controller.TaskEdit'
			}).then(function (dialog) {
				dialog.close.then(function (task) {
					if (task) {
						$state.go("tasks.task", {taskId: task.id});
					}
				});
			});
		};

	}]);