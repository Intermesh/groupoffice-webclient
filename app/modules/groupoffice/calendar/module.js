'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Calendar', ['GO.Core'])
	.run([
		'GO.Core.Services.Application',
		function (App) {

			App.currentUser.whenAuthenticated().then(function(){
				App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Calendar\\Module').then(function (module) {
					App.addLauncher('Calendar','calendar',false,{icon:'event'});
				});
			});

		}])
	.config(['$stateProvider', function ($stateProvider) {

			// Now set up the states
			$stateProvider
				.state('calendar', {
					url: '/calendar',
					templateUrl: 'modules/groupoffice/calendar/views/main.html',
					controller: 'GO.Modules.GroupOffice.Calendar.Main'
				})
				.state('calendar.year', {
					url: "/year",
					templateUrl: 'modules/groupoffice/calendar/views/year.html'
				})
				.state('calendar.month', {
					url: "/month",
					templateUrl: 'modules/groupoffice/calendar/views/month.html'
				})
				.state('calendar.week', {
					url: "/week",
					templateUrl: 'modules/groupoffice/calendar/views/week.html'
				})
				.state('calendar.list', {
					url: "/list",
					templateUrl: 'modules/groupoffice/calendar/views/list.html'
				})
				.state('calendar.search', {
					url: "/search",
					templateUrl: 'modules/groupoffice/calendar/views/search.html'
				})
				.state('calendar.search.event', {
					url: "/{id:[0-9]*}/{groupId:[0-9]*}",
					templateUrl: 'modules/groupoffice/calendar/views/event.html',
					controller: 'GO.Modules.GroupOffice.Calendar.Event'
				})
				.state('calendar.list.event', {
					url: "/{id:[0-9]*}/{groupId:[0-9]*}",
					templateUrl: 'modules/groupoffice/calendar/views/event.html',
					controller: 'GO.Modules.GroupOffice.Calendar.Event'
				})
				.state("settings.calendar", {
					url: '/contacts',
					controller: 'GO.Modules.GroupOffice.Calendar.ContactController',
					template: '<div ui-view></div>'
				});
		}]);