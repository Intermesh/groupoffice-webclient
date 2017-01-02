
/**
 * @ngdoc filter
 * @name GO.Core.Filters.dateinterval
 *
 * @description
 * Shows the human readable version of the dateinterval
 *
 * @param {string} interval (iso8601 format)
 * @returns {string} Human readable, translated interval
 */

angular.module('GO.Core')
		.filter('dateinterval', ['GO.Core.Providers.Translate', function(Translate) {

			function parseISO8601Duration(interval) {
				var iso8601DurationRegex = /(-)?P(?:([\.,\d]+)Y)?(?:([\.,\d]+)M)?(?:([\.,\d]+)W)?(?:([\.,\d]+)D)?(T(?:([\.,\d]+)H)?(?:([\.,\d]+)M)?(?:([\.,\d]+)S)?)?/;
				
				var matches = interval.match(iso8601DurationRegex);

				return {
						sign: matches[1] === undefined ? '+' : '-',
						years: matches[2] === undefined ? 0 : matches[2],
						months: matches[3] === undefined ? 0 : matches[3],
						weeks: matches[4] === undefined ? 0 : matches[4],
						days: matches[5] === undefined ? 0 : matches[5],
						
						hours: matches[7] === undefined ? 0 : matches[7],
						minutes: matches[8] === undefined ? 0 : matches[8],
						seconds: matches[9] === undefined ? 0 : matches[9]
				};
			};
				
			return function(dateinterval) {
				if(!dateinterval) {
					return "";
				}
				
				var parsedDateInterval = parseISO8601Duration(dateinterval);
				
				var returnstring = '';
				var printedSomething = false;
				
				if(parsedDateInterval.years){
					if(parsedDateInterval.years > 1){
						returnstring += parsedDateInterval.years +' '+ Translate.t('Years');
					} else {
						returnstring += parsedDateInterval.years +' '+ Translate.t('Year');
					}
					printedSomething = true;
				}
				
				if(parsedDateInterval.months){
					if(printedSomething){
						returnstring += ' ,';
					}
					printedSomething = true;
					
					if(parsedDateInterval.months > 1){
						returnstring += parsedDateInterval.months +' '+ Translate.t('Months');
					} else {
						returnstring += parsedDateInterval.months +' '+ Translate.t('Month');
					}
				}
				
				if(parsedDateInterval.weeks){
					if(printedSomething){
						returnstring += ' ,';
					}
					printedSomething = true;
					
					if(parsedDateInterval.weeks > 1){
						returnstring += parsedDateInterval.weeks +' '+ Translate.t('Weeks');
					} else {
						returnstring += parsedDateInterval.weeks +' '+ Translate.t('Week');
					}
					
				}
				
				if(parsedDateInterval.days){
					if(printedSomething){
						returnstring += ' ,';
					}
					printedSomething = true;
					
					if(parsedDateInterval.days > 1){
						returnstring += parsedDateInterval.days +' '+ Translate.t('Days');
					} else {
						returnstring += parsedDateInterval.days +' '+ Translate.t('Day');
					}
				}
				
				if(parsedDateInterval.hours){
					if(printedSomething){
						returnstring += ' ,';
					}
					printedSomething = true;
					
					if(parsedDateInterval.hours > 1){
						returnstring += parsedDateInterval.hours +' '+ Translate.t('Hours');
					} else {
						returnstring += parsedDateInterval.hours +' '+ Translate.t('Hour');
					}
				}
				
				if(parsedDateInterval.minutes){
					if(printedSomething){
						returnstring += ' ,';
					}
					printedSomething = true;
					
					if(parsedDateInterval.minutes > 1){
						returnstring += parsedDateInterval.minutes +' '+ Translate.t('Minutes');
					} else {
						returnstring += parsedDateInterval.minutes +' '+ Translate.t('Minute');
					}
				}
				
				if(parsedDateInterval.seconds){
					if(printedSomething){
						returnstring += ' ,';
					}
					printedSomething = true;
					
					if(parsedDateInterval.seconds > 1){
						returnstring += parsedDateInterval.seconds +' '+ Translate.t('Seconds');
					} else {
						returnstring += parsedDateInterval.seconds +' '+ Translate.t('Second');
					}
				}
								
				return returnstring;
			};
		}]);