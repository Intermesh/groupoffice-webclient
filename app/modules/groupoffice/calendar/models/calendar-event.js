'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Calendar').factory('GO.Modules.GroupOffice.Calendar.CalendarEvent', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.ServerAPI',
	function (Model, ServerAPI) {

		var CalendarEvent = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});

		CalendarEvent.prototype.$returnProperties = "*,alarms,calendarId,event[*,attendees,recurrenceRule,attachments]";
		CalendarEvent.prototype.$keys = ['eventId'];

		CalendarEvent.prototype.getStoreRoute = function () {
			return 'event/' + this.calendarId;
		};


		CalendarEvent.prototype.canWrite = function () {
			return this.isOrganizer && (this.permissions.write || this.permissions.manage);
		};

		CalendarEvent.prototype.hasMoreAttendees = function() {
			var attendees = 0;
			if(!this.event) {
				return false;
			}
			this.event.attendees.forEach(function(r) {
				if(!r.markDeleted) {
					attendees++;
				}
			});
			return attendees > 1;
		};
		CalendarEvent.prototype.download = function() {
			window.open(ServerAPI.url('event/download/'+this.event.id));
		};

		CalendarEvent.prototype.save = function() {
			this.event.startAt = this.startAt;
			this.event.endAt = this.endAt;
			return this.$parent.save.call(this, arguments);
		};
//
		return CalendarEvent;
	}]);
