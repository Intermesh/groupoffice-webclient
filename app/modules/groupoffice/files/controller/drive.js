'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Files').
	controller('GO.Modules.GroupOffice.Files.Drive', [
		'$scope',
		'$state',
		'$mdDialog',
		'GO.Modules.GroupOffice.Files.Model.Drive',
		function ($scope, $state, $mdDialog,  Drive) {

			$scope.model = new Drive();
			$scope.driveStore = $scope.model.getStore();
			$scope.driveStore.load();

			$scope.addDrive = function() {
				$mdDialog.show({
					controller: 'GO.Modules.GroupOffice.Files.DriveForm',
					templateUrl: 'modules/groupoffice/files/views/drive-form.html',
					parent: angular.element(document.body),
					scope: $scope.$new(),
					clickOutsideToClose:true
					//fullscreen: useFullScreen
				});
			};

			$scope.selectDrive = function (model) {
				$scope.model = model;
				$scope.browser.goTo(model);
				//MOUNT?
				//$scope.browser.open(model);
			};

			$scope.toggleInfo = function() {
				$scope.showInfo = !$scope.showInfo;
			};

		}]);
