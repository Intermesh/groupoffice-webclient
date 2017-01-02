

'use strict';

GO.module('GO.Modules.GroupOffice.Contacts').
				controller('GO.Modules.GroupOffice.Contacts.SettingsController', [
						'$scope', 
						'GO.Modules.GroupOffice.Contacts.Model.Contact', 
						'GO.Modules.GroupOffice.Contacts.ContactEditor', 
						'GO.Core.Services.CurrentUser', 
						function ($scope, Contact, ContactEditor,CurrentUser) {

						var contact = new Contact();

						$scope.editProfile = function () {							
								contact.readIf(CurrentUser.contact.id).then(function (result) {
																
								ContactEditor.show({contact: contact, attributes: {userId: CurrentUser.id}}).then(function (data) {
									data.close.then(function (contact) {


									});
								});
							});
						};
						
					}]);

		