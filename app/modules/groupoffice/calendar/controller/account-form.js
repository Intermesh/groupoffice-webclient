'use strict';

GO.module('GO.Modules.GroupOffice.Calendar').
	controller('GO.Modules.GroupOffice.Calendar.AccountForm', [
		'$scope',
		'$mdDialog',
		'$mdSidenav',
		'GO.Modules.GroupOffice.Calendar.Calendar',
		function ($scope, $mdDialog, $mdSidenav, Calendar) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
			$scope.edit = function(calendar) {
				var model = new Calendar();
				if(calendar) {
					model.setAttributes(calendar);
				}
				model.ownedBy = $scope.account.id;
				$scope.current = model;
				$mdSidenav('calendar').toggle();
			};
			$scope.delete = function() {
				$scope.current.delete().then(function() {
					$mdSidenav('calendar').close();
					$scope.$parent.accountStore.reload();
				});
			};
			$scope.escape = function() {
				$mdSidenav('calendar').close();
			};
			$scope.submit = function() {
				$scope.current.save().then(function() {
					$mdSidenav('calendar').close();
					$mdDialog.hide();
					$scope.$parent.accountStore.reload();
				});
			};
			$scope.addDefaultAlarm = function() {
				$scope.current.defaultAlarms.push({trigger:''});
			};
			$scope.selectAlarm = function(alarm, index) {
				if(alarm.trigger === '0') { //remove
					return $scope.current.defaultAlarms.splice(index, 1);
				}
				alarm.relativeTo = 1;
			};
		}
	]);