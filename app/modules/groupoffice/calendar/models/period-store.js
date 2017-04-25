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
				var i,data = {}, self = this;
	
				angular.forEach(this.items, function (calEvent) {
					i = new Date(calEvent.event.startAt);
					for(i.setHours(0,0,0,0); i <= calEvent.event.endAt; i.addDays(1)) {
						if(!calEvent.groupId || !self.selected[calEvent.calendarId]) {
							continue;
						}
						if (!data[i.getYmd()]) {
							data[i.getYmd()] = [];
						}
						if(calEvent.event.startAt.getYmd() < calEvent.event.endAt.getYmd())
							data[i.getYmd()].unshift(calEvent);
						else { // From previous day
							data[i.getYmd()].push(calEvent);
						}
					}

				});
				console.log(data);
				return data;
			};

			return PeriodStore;
		}]);