'use strict';

var GO = GO || {};
GO.Calendar = GO.Calendar || {};

GO.Calendar.util = {
   /**
	* Read the contract of the background color to determine foreground
	* @see https://en.wikipedia.org/wiki/YIQ
	* @param {string} bgColor hex with the hashtag
	* @returns {String} hex for text color
	*/
	fgColor: function(bgColor) {
		var r = parseInt(bgColor.substr(0,2),16),
			g = parseInt(bgColor.substr(2,2),16),
			b = parseInt(bgColor.substr(4,2),16),
			yiq = ((r*299)+(g*587)+(b*114))/1000;
		return (yiq >= 128) ? '000000' : 'FFFFFF';
	},
	color: function (hex, needsAction) {
		if(!hex) {
			return {};
		}
		return {
			'background-color': '#'+hex,
			'border-color': '#'+hex,
			'color': '#'+ (needsAction ? hex : GO.Calendar.util.fgColor(hex))
		};
	}
};

/* Controllers */
GO.module('GO.Modules.GroupOffice.Calendar').
	controller('GO.Modules.GroupOffice.Calendar.Main', [
		'$scope',
		'$mdDialog',
		'GO.Modules.GroupOffice.Calendar.CalendarEvent',
		'GO.Modules.GroupOffice.Calendar.PeriodStore',
		'GO.Modules.GroupOffice.Calendar.CurrentDate',
		'GO.Core.Factories.Data.Store',
		'$state',
		'$mdSidenav',
		'GO.Core.Services.Application',
		function ($scope, $mdDialog, CalendarEvent, PeriodStore, CurrentDate, Store, $state, $mdSidenav, App) {
			// The date that is currently viewed
			$scope.$mdSidenav = $mdSidenav;
			$scope.model = new CalendarEvent;

			$scope.searchStore = new Store('/event');

			$scope.selectedCalendars = {}; // checkboxed in de sidepanel
			$scope.calendars = {};
			$scope.writableCalendars = []; // writeable calendars for a user

			$scope.eventStore = new PeriodStore('/event');
			$scope.eventStore.$modelProto = $scope.model;

			$scope.nav = new CurrentDate($scope.eventStore);
			$scope.userId = App.currentUser.id;

			$scope.accountStore = new Store('/account', {returnProperties:"*,calendars[*,groups,defaultAlarms]"});
			$scope.accountStore.onLoad = function(data){
				//todo select all
				$scope.writableCalendars = [];
				for(var a in this.items) {
					var account = this.items[a];
					if(account.id == App.currentUser.group.id) {
						$scope.currentAccount = account;
					}
					for(var c in account.calendars) {
						var cal = account.calendars[c];
						$scope.calendars[cal.id] = cal;
						$scope.selectedCalendars[cal.id] = true; // select all
						if (cal.permissions.write) {
							$scope.writableCalendars.push(cal);
						}
					}
				}
			};
			$scope.accountStore.load();


			$scope.$watchCollection('selectedCalendars', function(selection) {
				$scope.eventStore.selected = selection;
				$scope.nav.notify();
			});

			$scope.selectEvent = function (event, search) {
				if(search) {
					$state.go("calendar.search.event", {id: event.id});
				} else {
					$state.go("calendar.list.event", {id: event.id});
				}
			};

			$scope.editAccount = function (account) {
				$scope.account = account;
				var accountDialog = $mdDialog.show({
					controller: 'GO.Modules.GroupOffice.Calendar.AccountForm',
					templateUrl: 'modules/groupoffice/calendar/views/account-form.html',
					parent: angular.element(document.body),
					scope: $scope.$new(),
					clickOutsideToClose:true
					//fullscreen: useFullScreen
				})
				.then(function(answer) {
				  $scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				  $scope.status = 'You cancelled the dialog.';
				});
			};

			$scope.addCalendar = function() {
				$scope.editAccount($scope.currentAccount);
			};

			$scope.openEventDialog = function (calEvent, defaults) {
				function open() {
					$mdDialog.show({
						controller: 'GO.Modules.GroupOffice.Calendar.EventForm',
						templateUrl: 'modules/groupoffice/calendar/views/event-form.html',
						parent: angular.element(document.body),
						scope: $scope.$new(),
						hasBackdrop: false,
						clickOutsideToClose:true
					})
					.then(function(answer) {
//						if(eventId) {
//							$scope.eventStore.reload();
//						}
					});
				}

				if (!calEvent) {
					var calendarId = $scope.writableCalendars[0].id;
					$scope.model = new CalendarEvent(); 
					$scope.model.read({calendarId:calendarId,eventId:0}).then(function () {
						if (defaults) {
							for(var d in defaults) {
								if(d == 'startAt' || d == 'endAt') {
									$scope.model.event[d] = defaults[d];
								}
								$scope.model[d] = defaults[d];
							}
						}
					}).then(open);
				} else {
					var p = {};
					if(calEvent.recurrenceId) {
						p.recurrenceId = calEvent.recurrenceId.toIntermeshApiFormat();
					}
					$scope.model.read({calendarId: calEvent.calendarId, eventId: calEvent.eventId}, p).then(open);
				}
			};


			$scope.nextWeek = function() {
//				$scope.$apply(function() {
					$scope.nav.prevWeek();
//				});
			};
			if($state.is('calendar')) {
				$state.go('calendar.month');
			}
			$scope.nav.today();
		}]);
