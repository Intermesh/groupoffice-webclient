'use strict';

GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.DriveForm', [
		'$scope',
		'$mdDialog',
		'$mdSidenav',
		'GO.Modules.GroupOffice.Files.Model.Node',
		function ($scope, $mdDialog, $mdSidenav, Node) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
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
		}
	]);