'use strict';

GO.module('GO.Modules.GroupOffice.Contacts').controller('GO.Modules.GroupOffice.Contacts.Controller.Share', [
	'$scope',
	'model',
	'close',
	'GO.Modules.GroupOffice.Users.Model.Group',
	function ($scope, model,  close, Group) {
		
		
		

		$scope.close = close;
		$scope.model = model;
		
		var ownerRecord;
		
		angular.forEach($scope.model.groups, function(g) {
			if(g.isOwner) {
				ownerRecord = g;
			}
		});
		
		
		function getGroupIds() {
			var ids = [];
			angular.forEach($scope.model.groups, function (item) {
				ids.push(item.groupId);
			});

			return ids;
		}

		var groupStore = new Group().getStore({returnProperties: "id,name", limit: 20});

		$scope.getGroups = function (input) {
			var p = {
				searchQuery: input
			};

			var groupIds = getGroupIds();

			if (groupIds.length) {
				p['q'] = [
					['where', ['!=', {id: groupIds}]]
				];
			}

			return groupStore.load(p).then(function (result) {
				return result.store.items;
			});
		};

		$scope.selectedGroup = null;
		$scope.groupSearchText = "";
		$scope.addGroup = function () {
			if ($scope.selectedGroup) {
				$scope.groupSearchText = "";

				var groupAccess = angular.copy(ownerRecord);
				groupAccess.permissions.update = groupAccess.permissions.update = true;
				groupAccess.group = $scope.selectedGroup;				
				groupAccess.groupId = $scope.selectedGroup.id;
				$scope.model.groups.push(groupAccess);
				
				$scope.model.save();
				$scope.selectedGroup = null;
				document.activeElement.blur();
			}
		};


		$scope.deleteRecord = function (group) {
			group.markDeleted = true;
			$scope.model.save();
		};
		

	}]);
