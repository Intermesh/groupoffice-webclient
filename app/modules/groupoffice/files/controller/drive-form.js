'use strict';

GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.DriveForm', [
		'$scope',
		'$mdDialog',
		'GO.Modules.GroupOffice.Files.Model.Drive',
		function ($scope, $mdDialog, Drive) {
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.save = function() {
				$scope.drive.save().then(function() {
					$mdDialog.hide();
					$scope.driveStore.reload();
				});
			};
		}
	]);