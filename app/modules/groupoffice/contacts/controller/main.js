'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Contacts').controller('GO.Modules.GroupOffice.Contacts.MainController', [
	'$scope',
	'GO.Modules.GroupOffice.Contacts.Model.Contact',
	'GO.Core.Services.ServerModules',
	'GO.Modules.GroupOffice.Contacts.ContactEditor',
	'$state',
	'$mdDialog',
	'$http',
	'GO.Core.Services.ServerAPI',
	'$timeout',
	function ($scope, Contact, ServerModules, ContactEditor, $state, $mdDialog, $http, ServerAPI, $timeout) {
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
			//wait until view is rendered
			if($scope.contactStore.init) {
				load();
			}
		};
		
		$scope.onCustomFiltersChange = function(filters, q) {
			$scope.filters.custom = q;
			
			//wait until view is rendered
			if($scope.contactStore.init) {
				load();
			}
		};

		function load() {

			$scope.contactStore.$loadParams.q = angular.copy($scope.filters.custom);

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
			
			$scope.contactStore.load();			
		}

		//timeout makes sure view is done.
		//this prevents the filters firing on change while still rendering.
		$timeout(function() {
			load();			
		});
		
		$scope.editMultiple = function() {
			$mdDialog.show({
				locals: {
					items: $scope.contactStore.$selected
				},
					controller: ['$scope', '$mdDialog', 'items', function ($scope, $mdDialog, items) {
							$scope.hide = function () {
								
								
								$mdDialog.hide();
							};
							
							$scope.model = {
								tags: []
							};
							
							$scope.save = function () {
								
								var data = [];
								
								angular.forEach(items, function(i) {
									data.push({
										id: i.id,
										tags: $scope.model.tags
									});
								});
								
								console.log(data);
								
								$http.put(ServerAPI.url('contacts'), {data: data}).then(function() {
									$mdDialog.hide($scope.model);
								});
								
								
							};
						}],
					templateUrl: 'modules/groupoffice/contacts/views/edit-multiple.html',

					clickOutsideToClose: true,
					fullscreen: true
				}).then(function (model) {
									load();
								});
		};
		
		


	}]);


