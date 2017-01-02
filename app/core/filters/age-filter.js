
/**
 * @ngdoc filter
 * @name GO.Core.Filters.age
 *
 * @description
 * Shows the age in years
 *
 * @param {string} date Date to calculate age for
 * @returns {int} Age in years
 */

angular.module('GO.Core')
		.filter('age', [function() {
				var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
// 1 2 3 4 5 6 7 8 9 10 11


				function jsonStringToDate(string) {
					var match;
					if (match = string.match(R_ISO8601_STR)) {
						var date = new Date(0),
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
					return string;
				}

				return function(value) {
				
					if(!value) {
						return 0;
					}
					
//					var date = jsonStringToDate(value);


					var ageDifMs = Date.now() - value.getTime();
					var ageDate = new Date(ageDifMs); // miliseconds from epoch
					return Math.abs(ageDate.getUTCFullYear() - 1970);
				};
			}]);