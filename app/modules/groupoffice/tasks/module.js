'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Tasks', ['GO.Core'])
	//Register the module
	.run([
		'GO.Core.Services.Application',
		function (App) {
			
			App.currentUser.whenAuthenticated().then(function(){
				App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Tasks\\Module').then(function (module) {
					
					App.addLauncher('Tasks', 'tasks', false, {icon:'assignment'});
					
					
					
					GO.hooks.register('contacts.contact', ['element', function(element) {
					
						var contents = angular.element(element[0].querySelector('md-content'));
						contents.append('\
						<div id="tasks" ng-include="\'modules/groupoffice/tasks/views/tasks-card.html\'" ng-controller="GO.Modules.GroupOffice.Tasks.Controllers.ContactTasks"></div>\
						');

						var toolbar = element.find('md-tabs');
						toolbar.append('<md-tab ng-click="goto(\'tasks\')">{{"Tasks" | goT}}</md-tab>');
					}]);

					
				});
			});
			
			App.addNotificationTemplate(
							"GO\\Modules\\GroupOffice\\Tasks\\Model\\Task",{
								update: "{{'Task {data.description} was updated' | goT: model}}",
								create: "{{'Task {data.description} was created' | goT: model}}",
								"delete": "{{'Task {data.description} was deleted' | goT: model}}",
								"completed": "{{'Task {data.description} was completed' | goT: model}}"
							},
							function(record, $state){
								$state.go('tasks.task', {taskId: record.recordId});
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
							templateUrl: 'modules/groupoffice/tasks/views/task.html',
							controller: 'GO.Modules.GroupOffice.Tasks.Controller.Task'
						})
						
						.state("settings.tasks", {
							url: '/tasks',
							controller: 'GO.Modules.GroupOffice.Tasks.TaskController',
							template: '<div ui-view></div>'
						});						
	}]);