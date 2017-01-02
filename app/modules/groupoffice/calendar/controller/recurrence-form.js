'use strict';

GO.module('GO.Modules.GroupOffice.Calendar').
	controller('GO.Modules.GroupOffice.Calendar.RecurrenceForm', [
		'$scope',
		function ($scope) {
			$scope.rRule = '0';
			$scope.dayz = ['mo','tu','we','th','fr','sa','so'];
			$scope.datez = [];
			$scope.range = 'forever';
			for(var i=1; i<=31; i++) {
				$scope.datez.push(i);
			}

			$scope.$parent.model.$lastReadPromise.then(function() {
				if($scope.$parent.model.event.isRecurring) {
					$scope.rRule = $scope.$parent.model.event.recurrenceRule.frequency;
					if($scope.$parent.model.event.recurrenceRule.interval > 0) {
						$scope.more = true;
					}
					if($scope.$parent.model.event.recurrenceRule.occurrences > 0) {
						$scope.changeRange('count');
					} else if($scope.$parent.model.event.recurrenceRule.until) {
						$scope.changeRange('until');
					}
				}
			});
			
			$scope.moreOptions = function() {
				$scope.more=true;
				$scope.$parent.model.event.recurrenceRule.interval = 1;
				$scope.weekdays = [$scope.$parent.model.event.startAt.getDay()];
			};

			$scope.changeRange = function(range) {
				$scope.range = range;
				//until, count or forever
				if(range == 'count'){
					$scope.$parent.model.event.recurrenceRule.occurrences = $scope.$parent.model.event.recurrenceRule.occurrences || 5; //default
				} else {
					delete $scope.$parent.model.event.recurrenceRule.occurrences;
				}
				if(range == 'until') {
					$scope.$parent.model.event.recurrenceRule.until = $scope.$parent.model.event.recurrenceRule.until || $scope.$parent.model.event.startAt; // default
				} else {
					delete $scope.$parent.model.event.recurrenceRule.until;
				}
			};

			$scope.changeRule = function(rule) {
				console.log(rule);
				$scope.more = false;
				if(rule === '0') {
					$scope.model.event.recurrenceRule.markDeleted = true; // remove recurrence
					return;
				}
				
				$scope.$parent.model.event.recurrenceRule = {frequency: rule};
			};


		}
	]);