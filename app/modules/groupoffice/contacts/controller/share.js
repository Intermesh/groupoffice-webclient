'use strict';

GO.module('GO.Modules.GroupOffice.Contacts').controller('GO.Modules.GroupOffice.Contacts.Controller.Share', [
	'$scope',
	'contact',
	'GO.Modules.GroupOffice.Contacts.Model.ContactGroup',
	'close',
	'GO.Modules.GroupOffice.Users.Model.Group',
	function ($scope, contact, ContactGroup, close, Group) {

		$scope.close = close;

		var contactGroup = new ContactGroup();
		contactGroup.contactId = contact.id;

		$scope.store = contactGroup.getStore();
		$scope.store.load();

		function getGroupIds() {
			var ids = [];
			angular.forEach($scope.store.items, function (item) {
				ids.push(item.groupId);
			});

			return ids;
		}

		var groupStore = new Group().getStore({returnProperties: "id,name", limit: 10});

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

				var contactGroup = new ContactGroup();
				contactGroup.group = $scope.selectedGroup;
				contactGroup.contactId = contact.id;
				contactGroup.groupId = $scope.selectedGroup.id;
				contactGroup.save();

				$scope.store.items.push(contactGroup);
			}
		};


		$scope.deleteRecord = function (index) {
			var record = $scope.store.items[index];
			$scope.store.items.splice(index, 1);
			record.deleteRecord();


		};

	}]);
