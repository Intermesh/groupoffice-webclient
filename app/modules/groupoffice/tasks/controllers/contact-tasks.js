'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Tasks').controller('GO.Modules.GroupOffice.Tasks.Controllers.ContactTasks', [
	'$scope',
	'GO.Modules.GroupOffice.Tasks.Model.Task',
	'GO.Core.Services.ServerModules',
	'GO.Core.Services.Dialog',
	'$state',
	'$stateParams',
	function ($scope, Task, ServerModules, Dialog, $state, $stateParams) {
		//Will be used in child scope. We define it here so we can access
		//the properties if needed in the future.
		//Child scopes automatically inherit properties of the parents but
		//not the other way around.
		$scope.task = new Task();

		$scope.taskStore = $scope.task.getStore({
			orderColumn: 'dueAt',
			returnProperties: "id,description,dueAt,deleted,completedAt",
			q: [				
				['joinRelation', 'contact'],
				['andWhere' , {"contact.id": $stateParams.contactId, completedAt: null}]
			]
		});
		
		
		$scope.taskStore.load().then(function() {			
			//for tab
			$scope.$parent.hasTasks = $scope.taskStore.items.length > 0;
		});
		
		$scope.more = function() {
			$state.go('tasks', {contactId: $stateParams.contactId, contactName: $scope.contact.name});
		};
		
		$scope.add = function() {
			Dialog.show({
				editModel: new Task(),
				templateUrl: 'modules/groupoffice/tasks/views/task-edit.html',
				controller: 'GO.Modules.GroupOffice.Tasks.Controller.TaskEdit'
			}).then(function (dialog) {
				
				dialog.read.then(function(result) {
					console.log(result);
					
					result.model.contact = {id: $stateParams.contactId};
				});
				
				dialog.close.then(function (task) {
//					if (task) {
//						$state.go("tasks.task", {taskId: task.id});
//					}
				});
			});
		};
	}]);



