'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Drives', [
		'$scope',
		'$state',
		'$mdDialog',
		'GO.Modules.GroupOffice.Files.Model.Drive',
		function ($scope, $state, $mdDialog,  Drive) {

			$scope.model = new Drive();
			$scope.driveStore = $scope.model.getStore();
			$scope.driveStore.load();

//			$scope.editDrive = function(drive) {
//				$scope.model = drive || new Drive();
//
//				$mdDialog.show({
//					controller: 'GO.Modules.GroupOffice.Files.DriveForm',
//					templateUrl: 'modules/groupoffice/files/views/drive-form.html',
//					parent: angular.element(document.body),
//					scope: $scope.$new(),
//					clickOutsideToClose:true
//					//fullscreen: useFullScreen
//				});
//			};

			$scope.selectDrive = function(model) {
				$state.go('files.locations.drive', {id: model.id});
			};

			$scope.toggleInfo = function() {
				$scope.showInfo = !$scope.showInfo;
			};

			$scope.mount = function(drive) {
				var mounts = $scope.mountStore;
				drive.mount().then(function() {
					mounts.load();
				});
			};
		}]);
