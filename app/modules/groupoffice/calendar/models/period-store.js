'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Calendar').
	factory('GO.Modules.GroupOffice.Calendar.PeriodStore', ['GO.Core.Factories.Data.Store', function (Store) {

			var PeriodStore = GO.extend(Store, function (baseParams) {
				this.$parent.skipFilterDupes = true;
				this.$parent.constructor.call(this, 'event');

			});

			PeriodStore.prototype.selected = {};

			PeriodStore.prototype.itemsByDay = function() {
				var i,a,data = {}, self = this;
	
				angular.forEach(this.items, function (event) {
					i = new Date(+event.startAt);
					for(i.setHours(0,0,0,0); i <= event.endAt; i.addDays(1)) {
						if (!data[i.getYmd()]) {
							data[i.getYmd()] = [];
						}
						for(a in event.attendees) {
							var attendee =  event.attendees[a];
							if(!attendee.userId) {
								continue;
							}
							if(!self.selected[attendee.calendarId]) {
								continue;
							}
							var eventCopy = angular.copy(event);
							eventCopy.calendarId = attendee.calendarId;
							eventCopy.responseStatus = attendee.responseStatus;
							eventCopy.hasAlarms = attendee.hasAlarms;
							eventCopy.userId = attendee.userId;
							if(event.startAt.getYmd() < event.endAt.getYmd())
								data[i.getYmd()].unshift(eventCopy);
							else { // From previous day
								data[i.getYmd()].push(eventCopy);
							}
						}
					}

				});
				return data;
			};

			return PeriodStore;
		}]);