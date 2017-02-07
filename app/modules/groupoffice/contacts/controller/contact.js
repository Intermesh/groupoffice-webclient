'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Contacts').
	controller('GO.Modules.GroupOffice.Contacts.ContactController', [
		'$scope',
		'GO.Modules.GroupOffice.Contacts.ContactLabels',
		'$stateParams',
		'$http',
		'$mdToast',
		'GO.Core.Services.Dialog',
		'GO.Core.Services.ServerAPI',
		function ($scope, contactLabels, $stateParams, $http, $mdToast, Dialog, ServerAPI) {

		$scope.flowInit = ServerAPI.getFlowInit();
		$scope.import = function($file, $message) {

			var response = angular.fromJson($message);
			$http.get(ServerAPI.url('contacts/import/'+response.data.blobId)).then(function(response) {
				console.log(response);
				$mdToast.show($mdToast.simple().content(response.data.created + ' Contacts created, '+response.data.failed+ ' Failed'));
				$scope.$parent.contactStore.reload();
			});
		};
		//Contact model is defined in the parent scope of ContactsController
		$scope.contact.readIf($stateParams.contactId).then(function () {
			//$scope.setTitle($scope.contact.name);
		});

		$scope.share = function(contact) {
				return Dialog.show({
				templateUrl: 'modules/groupoffice/contacts/views/share.html',
				controller: 'GO.Modules.GroupOffice.Contacts.Controller.Share',
				inputs: {
					model: contact
				}
			});
		};

		$scope.contactLabels = contactLabels;
	}]);