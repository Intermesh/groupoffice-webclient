'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Contacts', ['GO.Core']).run([
	'GO.Core.Services.Application',
	'GO.Modules.GroupOffice.Users.Model.User',
	'GO.Modules.GroupOffice.Tasks.Model.Task',
	function (App, User, Task) {


		var onNotificationClick = function (record, $state) {
			$state.go('contacts.contact', {contactId: record.recordId});
		};


		App.addNotificationTemplate(
						"GO\\Modules\\GroupOffice\\Contacts\\Model\\Contact", {
							update: {template: "<go-notification-standard on-open='open(model)' on-dismiss='dismiss(model)' model='model'>{{'Contact {data.name} was updated' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							create: {template: "<go-notification-standard on-open='open(model)' on-dismiss='dismiss(model)' model='model'>{{'Contact {data.name} was created' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							"delete": {template: "<go-notification-standard on-open='open(model)' on-dismiss='dismiss(model)' model='model'>{{'Contact {data.name} was deleted' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							"completed": {template: "<go-notification-standard on-open='open(model)' on-dismiss='dismiss(model)' model='model'>{{'Contact {data.name} was completed' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							"comment": {template: "<go-notification-standard on-open='open(model)' on-dismiss='dismiss(model)' model=\'model\'>{{'New comment for contact {data.name}: {data.excerpt}' | goT: model}}</go-notification-standard>", onClick: onNotificationClick}
//								"comment": {templateUrl: 'modules/groupoffice/notifications/test.htmlContact
						}

		);

		App.currentUser.whenAuthenticated().then(function () {
			if (App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Contacts\\Module').then(function (module) {
				App.addLauncher('Contacts', 'contacts', false, {icon: 'contacts'});
				
				
				App.addAccountType('GO\\Modules\\GroupOffice\\Contacts\\Model\\Account', 'GO.Modules.GroupOffice.Contacts.Model.Account', 'contacts', {
					templateUrl: 'modules/groupoffice/contacts/views/account-edit.html',
					controller: 'GO.Modules.GroupOffice.Contacts.Controller.AccountEdit'			
				});
				

				User.prototype.$returnProperties += ',contact';

				//Extend task
				Task.prototype.$returnProperties += ',contact';

				//insert template in task
				GO.hooks.register('tasks.task', ['element', function (element) {
						var list = element.find('md-list');
						list.prepend('<md-list-item class="md-2-line" ng-if="task.contact">\
								<md-icon>contacts</md-icon>\
								<div class="md-list-item-text">\
									<a ui-sref="contacts.contact({contactId: task.contact.id})">{{task.contact.name}}</a>\
									<p>{{::"Contact"| goT}}</p>\
								</div>\
							</md-list-item>');
					}]);


			}))
				;



		});
	}])

				.config(['$stateProvider', function ($stateProvider) {

						// Now set up the states
						$stateProvider
										.state('contacts', {
											url: '/contacts',
											templateUrl: 'modules/groupoffice/contacts/views/main.html',
											controller: 'GO.Modules.GroupOffice.Contacts.MainController'
										})

										.state('contacts.contact', {
											url: "/{contactId:[0-9]*}",
											templateUrl: 'modules/groupoffice/contacts/views/contact.html',
											controller: 'GO.Modules.GroupOffice.Contacts.ContactController'
										})

										.state('contacts.edit', {
											url: "/edit/{contactId:[0-9]*}",
											templateUrl: 'modules/groupoffice/contacts/views/contact-edit.html',
											controller: 'GO.Modules.GroupOffice.Contacts.ContactEditController',
											params: {
												attributes: null
											}
										})
										.state('contacts.createCompany', {
											url: "/createCompany",
											templateUrl: 'modules/groupoffice/contacts/views/contact-edit.html',
											controller: 'GO.Modules.GroupOffice.Contacts.ContactEditController'
										})

										.state("settings.contacts", {
											url: '/contacts',
											controller: 'GO.Modules.GroupOffice.Contacts.ContactController',
											template: '<div ui-view></div>'
										})

										.state("settings.contacts.editProfile", {
											url: '/{contactId:[0-9a-z]*}',
											templateUrl: 'modules/groupoffice/contacts/views/contact-edit.html',
											controller: 'GO.Modules.GroupOffice.Contacts.ContactEditController'
										});
					}]);