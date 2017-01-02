'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Contacts').controller('GO.Modules.GroupOffice.Contacts.MainController', [
	'$scope',
	'GO.Modules.GroupOffice.Contacts.Model.Contact',
	'GO.Core.Services.ServerModules',
	'GO.Modules.GroupOffice.Contacts.ContactEditor',
	'$state',
	function ($scope, Contact, ServerModules, ContactEditor, $state) {
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

//loading done by filter collection directive
//				$scope.store.load();			
	}]);


