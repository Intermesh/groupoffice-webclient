'use strict';

GO.module('GO.Modules.GroupOffice.Calendar').
	controller('GO.Modules.GroupOffice.Calendar.RecurrenceForm', [
		'$scope',
		function ($scope) {
//			$scope.rRule = null;
			$scope.dayz = ['mo','tu','we','th','fr','sa','so'];
			$scope.datez = [];
			$scope.range = 'forever';
			for(var i=1; i<=31; i++) {
				$scope.datez.push(i);
			}

			$scope.model.$lastReadPromise.then(function() {
				if($scope.model.event.isRecurring) {
					$scope.rRule = $scope.model.event.recurrenceRule.frequency;
					if($scope.$parent.model.event.recurrenceRule.interval > 0) {
						$scope.more = true;
					}
					if($scope.model.event.recurrenceRule.occurrences > 0) {
						$scope.changeRange('count');
					} else if($scope.model.event.recurrenceRule.until) {
						$scope.changeRange('until');
					}
				}else{
					$scope.model.event.recurrenceRule = {frequency: null};
				}
			});
			
			$scope.moreOptions = function() {
				$scope.more=true;
				$scope.$parent.model.event.recurrenceRule.interval = 1;
				$scope.weekdays = [$scope.model.event.start.getDay()];
			};

			$scope.changeRange = function(range) {
				$scope.range = range;
				//until, count or forever
				if(range == 'count'){
					$scope.model.event.recurrenceRule.occurrences = $scope.model.event.recurrenceRule.occurrences || 5; //default
				} else {
					$scope.model.event.recurrenceRule.occurrences = null;
				}
				if(range == 'until') {
					$scope.model.event.recurrenceRule.until = $scope.model.event.recurrenceRule.until || $scope.model.event.startAt; // default
				} else {
					$scope.model.event.recurrenceRule.until = null;
				}
			};

			$scope.changeRule = function() {
				$scope.rRule = $scope.model.event.recurrenceRule.frequency;
				$scope.more = false;
				if($scope.rRule === null) {
					$scope.model.event.recurrenceRule.markDeleted = true; // remove recurrence
					return;
				}
				
				$scope.model.event.recurrenceRule = {frequency: $scope.rRule};
			};


		}
	]);