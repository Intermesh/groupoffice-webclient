'use strict';

GO.module('GO.Modules.GroupOffice.Users').controller('GO.Modules.GroupOffice.Users.Controller.UserEdit', [
	'$scope',
	'$q',
	'GO.Modules.GroupOffice.Users.Model.Group',
	function ($scope, $q, Group) {

		var origSave = $scope.save;

		$scope.save = function () {
			GO.markArrayDeleted(['id'], $scope.model.$oldAttributes.groups, $scope.model.groups);
			return origSave.call(this);
		};

		var groupStore = new Group().getStore();

		$scope.getGroups = function (input) {
			return groupStore.load({
				searchQuery: input
			}).then(function (result) {
				return result.store.items;
			});
		};


		$scope.transformChip = function (chip) {
			if (!chip.name) {
				chip = {name: chip};
			}
			return chip;
		};
		
		$scope.filterGroups = function(group) {
			return group.id != 2;// && group.userId != $scope.model.id;
		};
	}]);