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
					i = new Date(calEvent.startAt);
					for(i.setHours(0,0,0,0); i <= calEvent.endAt; i.addDays(1)) {
						if(!calEvent.groupId || !self.selected[calEvent.calendarId]) {
							continue;
						}
						if (!data[i.getYmd()]) {
							data[i.getYmd()] = [];
						}
						if(calEvent.startAt.getYmd() < calEvent.endAt.getYmd())
							data[i.getYmd()].unshift(calEvent);
						else { // From previous day
							data[i.getYmd()].push(calEvent);
						}
					}
				});
				return data;
			};

			return PeriodStore;
		}]);