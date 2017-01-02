'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Contacts').
				factory('GO.Modules.GroupOffice.Contacts.ContactEditor', ['GO.Core.Services.Dialog', 'GO.Modules.GroupOffice.Contacts.Model.Contact', function (Dialog, Contact) {

						
						
						var ContactEditor = function () {

						};

						/**
						 * ContactEditor.show({contact: null, attributes: {name: this.from.personal, emailAddresses: [{email: this.from.email}]}});
						 * @param {type} config
						 * @returns {unresolved}
						 */
						ContactEditor.prototype.show = function (config) {
							
							
							return Dialog.show({
								editModel: config.contact,
								templateUrl: 'modules/groupoffice/contacts/views/contact-edit.html',
								controller: 'GO.Modules.GroupOffice.Contacts.ContactEditController as ctrl',
								inputs: {
									config: config
								}
							});
						};

						return new ContactEditor();
					}]);