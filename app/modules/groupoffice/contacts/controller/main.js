'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Contacts').controller('GO.Modules.GroupOffice.Contacts.MainController', [
	'$scope',
	'GO.Modules.GroupOffice.Contacts.Model.Contact',
	'GO.Core.Services.ServerModules',
	'GO.Modules.GroupOffice.Contacts.ContactEditor',
	'$state',
	'$mdDialog',
	function ($scope, Contact, ServerModules, ContactEditor, $state, $mdDialog) {
		//Will be used in child scope. We define it here so we can access
		//the properties if needed in the future.
		//Child scopes automatically inherit properties of the parents but
		//not the other way around.
		$scope.contact = new Contact();

		$scope.contactStore = $scope.contact.getStore({
			returnProperties: "id,name,photoBlobId,organizations[name]",
			orderColumn: 't.firstName',
			orderDirection: 'ASC'
		});

		$scope.selectContact = function (contact) {
			$state.go("contacts.contact", {contactId: contact.id});
		};

		//Check if the user may create new contacts
		ServerModules.fetchModule('GO\\Modules\\GroupOffice\\Contacts\\Module').then(function (module) {
			$scope.canCreate = module.permissions.createContacts;
		});


		$scope.edit = function (config) {
			var config = config || {};

			if (!config.contact) {
				//this will keep the store connection
				config.contact = new Contact();
				config.contact.addStore($scope.contactStore);
			}

			ContactEditor.show(config).then(function (data) {
				data.close.then(function (contact) {
					if (contact) {
						$state.go("contacts.contact", {contactId: contact.id});
					}
				});
			});

		};


		$scope.filters = {
			type: 'all',
			tags: [],
			custom: []
		};

		$scope.updateFilter = function (name, value) {
			$scope.filters[name] = value;
			load();
		};

		function load() {

			$scope.contactStore.$loadParams.q = [];

			switch ($scope.filters.type) {
				case 'persons':
					$scope.contactStore.$loadParams.q.push(['andWhere', {'isOrganization': false}]);
					break;

				case 'organizations':
					$scope.contactStore.$loadParams.q.push(['andWhere', {'isOrganization': true}]);
					break;

			}

			if ($scope.filters.tags.length) {
				$scope.contactStore.$loadParams.q.push(['joinRelation', 'tags']);
				$scope.contactStore.$loadParams.q.push(['andWhere', {'tags.id': $scope.filters.tags}]);
			}

			angular.forEach($scope.filters.custom, function (c) {
				$scope.contactStore.$loadParams.q.push(['joinRelation', 'tags']);
				var where = {};
				where[c.field] = c.query;

				var parts = c.field.split('.');
				if (parts.length > 1) {
					parts.pop();
					var rel = parts.join('.');
					$scope.contactStore.$loadParams.q.push(['joinRelation', rel]);
				}

				$scope.contactStore.$loadParams.q.push(['andWhere', [c.comparator, where]]);
			});

			$scope.contactStore.load();
		}
		;

		load();
		
		$scope.deleteFilter = function(index) {
			$scope.filters.custom.splice(index,1);
			load();
		};


		$scope.addFilter = function () {
			$mdDialog.show({
				controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
						$scope.hide = function () {
							$mdDialog.hide();
						};


						$scope.model = {field: null, query: [], comparator: 'LIKE'};

						$scope.save = function () {
							$mdDialog.hide($scope.model);
						};
					}],
				templateUrl: 'modules/groupoffice/contacts/views/add-filter.html',

				clickOutsideToClose: true,
				fullscreen: true
			})
							.then(function (model) {
								if (model) {
									$scope.filters.custom.push(model);
									load();
								}

							});
		};


	}]);


