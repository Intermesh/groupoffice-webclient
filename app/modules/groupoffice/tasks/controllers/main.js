'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Tasks').controller('GO.Modules.GroupOffice.Tasks.Controller.Main', [
	'$scope',
	'GO.Modules.GroupOffice.Tasks.Model.Task',
	'GO.Core.Services.Dialog',
	'$state',
	'GO.Core.Services.CurrentUser',
	'$stateParams',
	'$timeout',
	function ($scope, Task, Dialog, $state, CurrentUser, $stateParams, $timeout) {


		$scope.task = new Task();


		$scope.store = $scope.task.getStore({
			orderColumn: 'dueAt',
			returnProperties: "id,description,dueAt,deleted,completedAt"
		});
		
		
		$scope.filters ={
			status : 'incomplete',
			assigned: 'mine',
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