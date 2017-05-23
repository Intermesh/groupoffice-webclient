'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Tasks', ['GO.Core']).run([
	'GO.Core.Services.Application',
	function (App) {

		App.currentUser.whenAuthenticated().then(function () {
			if (App.currentUser.getServerModule('GO\\Modules\\GroupOffice\\Tasks\\Module')) {

				App.addLauncher('Tasks', 'tasks', false, {icon: 'assignment'});

				GO.hooks.register('contacts.contact', ['element', function (element) {

						var contents = angular.element(element[0].querySelector('md-content'));
						contents.append('\
						<div id="tasks" ng-include="\'modules/groupoffice/tasks/views/tasks-card.html\'" ng-controller="GO.Modules.GroupOffice.Tasks.Controllers.ContactTasks"></div>\
						');

						var toolbar = element.find('md-tabs');
						toolbar.append('<md-tab ng-click="goto(\'tasks\')">{{"Tasks" | goT}}</md-tab>');
					}]);


			}
		});

		var onNotificationClick = function (record, $state) {
			$state.go('tasks.task', {taskId: record.recordId});
		};

		App.addNotificationTemplate(
						"GO\\Modules\\GroupOffice\\Tasks\\Model\\Task", {
							update: {template: "<go-notification-standard model='model'>{{'Task {data.description} was updated' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							create: {template: "<go-notification-standard model='model'>{{'Task {data.description} was created' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							"delete": {template: "<go-notification-standard model='model'>{{'Task {data.description} was deleted' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							"completed": {template: "<go-notification-standard model='model'>{{'Task {data.description} was completed' | goT: model}}</go-notification-standard>", onClick: onNotificationClick},
							"comment": {template: "<go-notification-standard model=\'model\'>{{'New comment for task {data.description}: {data.excerpt}' | goT: model}}</go-notification-standard>", onClick: onNotificationClick}
//								"comment": {templateUrl: 'modules/groupoffice/notifications/test.html'}
						}

		);

	}])
				.config(['$stateProvider', function ($stateProvider) {

						// Now set up the states
						$stateProvider
										.state('tasks', {
											url: '/tasks?contactId&contactName',
											templateUrl: 'modules/groupoffice/tasks/views/main.html',
											controller: 'GO.Modules.GroupOffice.Tasks.Controller.Main'
										})

										.state('tasks.task', {
											url: "/{taskId:[0-9]*}",
											reloadOnSearch: false, //needed for contactName query param in main state
											templateUrl: 'modules/groupoffice/tasks/views/task.html',
											controller: 'GO.Modules.GroupOffice.Tasks.Controller.Task'
										})

										.state("settings.tasks", {
											url: '/tasks',
											controller: 'GO.Modules.GroupOffice.Tasks.TaskController',
											template: '<div ui-view></div>'
										});
					}]);