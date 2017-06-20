'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Tasks').controller('GO.Modules.GroupOffice.Tasks.Controller.Main', [
	'$scope',
	'GO.Modules.GroupOffice.Tasks.Model.Task',
	'GO.Core.Services.Dialog',
	'$state',
	'GO.Core.Services.CurrentUser',
	'GO.Core.Factories.Data.Resource',
	'$stateParams',
	'$timeout',
	function ($scope, Task, Dialog, $state, CurrentUser, Resource,  $stateParams, $timeout) {


		$scope.task = new Task();
		
		$scope.assigneeStore = (new Resource('tasks/assignees')).getStore();
		$scope.assigneeStore.load();


		$scope.store = $scope.task.getStore({
			orderColumn: 't.dueAt',
			orderDirection: 'ASC',
			returnProperties: "id,description,dueAt,deleted,completedAt"
		});
		
		
		$scope.filters ={
			status : 'incomplete',
			assigned: 'all', //CurrentUser.id,
			tags: [],
			custom: []
		};
		
		
		$scope.updateFilter = function(name, value) {
			
			$scope.filters[name] = value;			
			
			//wait for view to be rendered
			if($scope.store.init) {
				load();
			}
		};		
		
		$scope.onCustomFiltersChange = function(filters, q) {
			$scope.filters.custom = q;
			//wait for view to be rendered
			if($scope.store.init) {
				load();
			}
		};
		
		$scope.onCustomFiltersReady = function(ctrl) {
			if($stateParams.contactId) {
				ctrl.add('contact.id', $stateParams.contactId, '=', $stateParams.contactName, 'chevron_left', function() {
					$state.go('contacts.contact', {contactId: $stateParams.contactId});
				});
			}
		};
		
		function load() {

			$scope.store.$loadParams.q = angular.copy($scope.filters.custom);
			
//			if($scope.filters.assigned.length){
//				
//				if($scope.filters.assigned.indexOf("NULL") > -1) {					
//					$scope.store.$loadParams.q.push(['whereGroup',[
//						['andWhere', {assignedTo: $scope.filters.assigned}],
//						['orWhere', {assignedTo: null}]
//					], 'AND']);						
//				}else
//				{
//					$scope.store.$loadParams.q.push(['andWhere',{assignedTo: $scope.filters.assigned}]);
//				}		
//			}
			switch($scope.filters.assigned) {
				case 'all':					
					break;
					
				case 'NULL':
					$scope.store.$loadParams.q.push(['andWhere', {'assignedTo': null}]);						
					break;
					
				default: 
					$scope.store.$loadParams.q.push(['andWhere', {'assignedTo': $scope.filters.assigned}]);						
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

		//timeout will parse filter components first.
		$timeout(function() {
			load();
		});
		

		$scope.edit = function (task) {

			if (!task) {
				task = new Task();
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