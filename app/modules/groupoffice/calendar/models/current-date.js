'use strict';

/* Controllers */
angular.
	module('GO.Modules.GroupOffice.Calendar').
	factory('GO.Modules.GroupOffice.Calendar.CurrentDate', ['$state',function ($state) {
			function CurrentDate(store) {
				this.store = store;
				this.date = new Date();
			}
			CurrentDate.prototype.from = new Date();
			CurrentDate.prototype.till = new Date();

			CurrentDate.prototype.nextWeek = function () {
				this.date.setDate(this.date.getDate() + 7);
				this.notify();
			};
			CurrentDate.prototype.prevWeek = function () {
				this.date.setDate(this.date.getDate() - 7);
				this.notify();
			};
			CurrentDate.prototype.setWeek = function (n) {
				this.date.setMonth(0);
				this.date.setDate(n * 7);
				this.notify();
			};

			CurrentDate.prototype.nextMonth = function () {
				this.date.addMonths(1);
				this.notify();
			};
			CurrentDate.prototype.prevMonth = function () {
				this.date.addMonths(-1);
				this.notify();
			};
			CurrentDate.prototype.setMonth = function (n) {
				var distance = this.date.getMonth() - n;
				this.date.addMonths(-distance);
				this.notify();
			};

			CurrentDate.prototype.nextYear = function () {
				this.date.addYears(1);
				this.notify();
			};
			CurrentDate.prototype.prevYear = function () {
				this.date.addYears(-1);
				this.notify();
			};
			CurrentDate.prototype.setYear = function (y) {
				var distance = this.date.getFullYear() - y;
				this.date.addYears(-distance);
				this.notify();
			};

			CurrentDate.prototype.show = function () {
				return this.date.getYmd();
			};
			CurrentDate.prototype.getDate = function () {
				//clone
				return new Date(this.date.getYmd());
			};

			CurrentDate.prototype.today = function () {
				this.date = new Date();
				this.notify();
			};

			CurrentDate.prototype.view = function(state) {
				if($state.current.name === state)
					return;
				$state.go(state);
				this.notify(state);
			};

			CurrentDate.prototype.notify = function(state) {
				
				state = state || $state.current.name;
				var from = this.getDate(),
					till = this.getDate();

				switch(state) {
					case 'calendar.week':
						from.setDate(from.getDate()-from.getDay()); //sunday
						till.setDate(from.getDate()+7); // sunday
						break;
					case 'calendar.month':
						from.setDate(-6);
						till.addMonths(1);
						till.setDate(6);
						break;
					case 'calendar.year':
						from.setMonth(0);
						from.setDate(1);
						till.setMonth(11);
						till.setDate(31);
						break;
				}
				//if(this.from.getYmd() != from.getYmd() | this.till.getYmd() != till.getYmd()) {
					this.from = from;
					this.till = till;
					this.store.load({from: from.getYmd(), until:till.getYmd()});
				//}
			};

			return CurrentDate;
	}]);
