'use strict';

/* Controllers */
angular.
	module('GO.Modules.GroupOffice.Calendar').
	factory('GO.Modules.GroupOffice.Calendar.CurrentDate', [function () {
			function CurrentDate(store) {
				this.store = store;
				this.date = new Date();
			}

			CurrentDate.prototype.nextWeek = function () {
				this.date.setDate(this.date.getDate() + 7);
			};
			CurrentDate.prototype.prevWeek = function () {
				this.date.setDate(this.date.getDate() - 7);
			};
			CurrentDate.prototype.setWeek = function (n) {
				this.date.setMonth(0);
				this.date.setDate(n * 7);
			};

			CurrentDate.prototype.nextMonth = function () {
				this.date.addMonths(1);
			};
			CurrentDate.prototype.prevMonth = function () {
				this.date.addMonths(-1);
			};
			CurrentDate.prototype.setMonth = function (n) {
				var distance = this.date.getMonth() - n;
				this.date.addMonths(-distance);
			};

			CurrentDate.prototype.setYear = function (y) {
				var distance = this.date.getFullYear() - y;
				this.date.addYears(-distance);
			};

			CurrentDate.prototype.show = function () {
				this.store.load({year:2016});
				return this.date.getYmd();
			};
			CurrentDate.prototype.getDate = function () {
				
				return this.date;
			};

			CurrentDate.prototype.today = function () {
				return this.date = new Date();
			};

			return CurrentDate;
	}]);
