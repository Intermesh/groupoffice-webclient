'use strict';
/**
 * permission should be an array of object container key and name
 * eg. [{key: write, name: 'Write'}, {key:read, name: 'Read'}]
 */
GO.module('GO.Core').directive('goShare', [
	function () {
		return {
			restrict: 'E',
			scope: {
				model: '=',
				modelPk: '@',
				groupFk: '@',
				groupsAttribute: '@',
				permissions: '='
			},
			compile: function(element, attrs){
				if (!attrs.modelPk) { attrs.modelPk = 'id'; }
				if (!attrs.groupFk) { attrs.groupFk = 'modelId'; }
				if (!attrs.groupsAttribute) { attrs.groupsAttribute = 'groups'; }
			},
			templateUrl: 'core/directives/share/share.html',
			controller : ['$scope','$attrs', 'GO.Modules.GroupOffice.Users.Model.Group',
				function ($scope, $attrs, Group) {
					var ownerRecord;
					if(!$scope.model) {
						return;
					}
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
						var params = {
							searchQuery: input
						};

						var groupIds = getGroupIds();

						if (groupIds.length) {
							params['q'] = [
								['where', ['!=', {id: groupIds}]]
							];
						}

						return groupStore.load(params).then(function (result) {
							return result.store.items;
						});
					};

					$scope.selectedGroup = null;
					$scope.groupSearchText = "";
					$scope.addGroup = function () {
						if ($scope.selectedGroup) {
							$scope.groupSearchText = "";
							var groupAccess = ownerRecord ? angular.copy(ownerRecord) : {} ;
							groupAccess.group = $scope.selectedGroup;
							groupAccess.groupId = $scope.selectedGroup.id;
							groupAccess[$attrs.groupFk] = $scope.model[$scope.modelPk];

							$scope.model[$scope.groupsAttribute].push(groupAccess);
							$scope.model.save();
							$scope.selectedGroup = null;
							document.activeElement.blur();
						}
					};


					$scope.deleteRecord = function (group) {
						group.markDeleted = true;
						$scope.model.save();
					};

			}]
		};
	

	}]);
