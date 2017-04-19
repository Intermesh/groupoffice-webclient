'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Drive', [
		'$scope',
		'$stateParams',
		'$mdDialog',
		'GO.Modules.GroupOffice.Files.Model.Drive',
		function ($scope, $stateParams, $mdDialog,  Drive) {

			$scope.drive.read({id:$stateParams.id});

			$scope.editDrive = function(drive) {
				$scope.drive = drive || new Drive();

				$mdDialog.show({
					controller: 'GO.Modules.GroupOffice.Files.DriveForm',
					templateUrl: 'modules/groupoffice/files/views/drive-form.html',
					parent: angular.element(document.body),
					scope: $scope.$new(),
					clickOutsideToClose:true
					//fullscreen: useFullScreen
				});
			};

		}]);
