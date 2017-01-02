'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.ICalendar', ['GO.Core'])
	.config(['$stateProvider', function ($stateProvider) {
			// Now set up the states
			$stateProvider

							.state('settings.calendaraccounts', {
								url: "/icalendar/accounts",
								templateUrl: "modules/groupoffice/icalendar/views/settings/accounts.html",
								controller: "GO.Modules.GroupOffice.ICalendar.AccountsController"
							});

		}]);