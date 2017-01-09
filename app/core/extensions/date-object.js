/**
 * Convert date object to API format
 *
 * @returns {String}
 */
Date.prototype.toIntermeshApiFormat = function () {
	if (this.getHours() === 0 && this.getMinutes() === 0) {
		//when there's no time in the date we just want to send 2014-09-01 for example.
		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
	} else
	{
		return this.toISOString();
	}
};

Date.prototype.getWeek = function() {
	var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};
Date.prototype.addDays = function(numberOfDays) {
	this.setDate(this.getDate() + numberOfDays);
};
Date.prototype.addMonths = function(numberOfMonths) {
	function getNumberOfDaysInMonth(date) {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	}
	// If the same date in the target month does not actually exist, the Date object will
	// automatically advance *another* month by the number of missing days.
	// For example, if you try to go from Jan. 30 to Feb. 30, you'll end up on March 2.
	// So, we check if the month overflowed and go to the last day of the target month instead.
	var dateInTargetMonth = new Date(this.getFullYear(), this.getMonth() + numberOfMonths, 1);
	var numberOfDaysInMonth = getNumberOfDaysInMonth(dateInTargetMonth);
	if (numberOfDaysInMonth < this.getDate()) {
	  dateInTargetMonth.setDate(numberOfDaysInMonth);
	} else {
	  dateInTargetMonth.setDate(this.getDate());
	}
	this.setTime(+dateInTargetMonth);
};

Date.prototype.addYears = function(numberOfYears) {
	this.addMonths(numberOfYears * 12);
};

Date.prototype.getYmd = function () {
	return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
};

Date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
Date.firstWeekDay = 1; //0 = sunday, 1 = monday, etc

Date.prototype.getMonthName = function(){
	return Date.months[this.getMonth()];
};

Date.prototype.getDayName = function(){
	return Date.days[this.getDay()];
};
Date.prototype.getDateString = function() {
	return this.getDayName()+', '+this.getDate()+ ' ' + this.getMonthName();
};

Date.prototype.getTimeString = function() {
	return this.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").slice(0,-3);
};



Date.INTERMESH_API_REGEX = /^(\d{4})-(\d\d)-(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;

/**
 * Create date object from API format
 *
 * @param {string} apiStr
 * @returns {Date|false}
 */
Date.fromIntermeshApiFormat = function (apiStr) {
	var match;

	if (match = apiStr.match(Date.INTERMESH_API_REGEX)) {

		var date = new Date(),
				tzHour = 0,
				tzMin = 0,
				dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
				timeSetter = match[8] ? date.setUTCHours : date.setHours;
		if (match[9]) {
			tzHour = int(match[9] + match[10]);
			tzMin = int(match[9] + match[11]);
		}
		dateSetter.call(date, parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
		var h = parseInt(match[4] || 0) - tzHour;
		var m = parseInt(match[5] || 0) - tzMin;
		var s = parseInt(match[6] || 0);
		var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
		timeSetter.call(date, h, m, s, ms);
		return date;
	}

	return false;
};
