'use strict';

// register the interceptor as a service
angular.module('GO.Core').factory('GO.Core.Factories.Util.Duration', [
	function () {
		function Duration(intervalStr) {			
			this.setInterval(intervalStr);			
		}

		Duration.prototype.setInterval = function (intervalStr) {
			
			if(GO.isEmpty(intervalStr)) {
				this.sign = '+';
				this.years = 0;
				this.months = 0;
				this.weeks = 0;
				this.days = 0;
				this.hours = 0;
				this.minutes = 0;
				this.seconds = 0;
				return;
			}

			var iso8601DurationRegex = /(-)?P(?:([\.,\d]+)Y)?(?:([\.,\d]+)M)?(?:([\.,\d]+)W)?(?:([\.,\d]+)D)?(T(?:([\.,\d]+)H)?(?:([\.,\d]+)M)?(?:([\.,\d]+)S)?)?/;

			var matches = intervalStr.match(iso8601DurationRegex);

			if(matches) {
				this.sign = matches[1] === undefined ? '+' : '-',
				this.years = matches[2] === undefined ? 0 : matches[2],
				this.months = matches[3] === undefined ? 0 : matches[3],
				this.weeks = matches[4] === undefined ? 0 : matches[4],
				this.days = matches[5] === undefined ? 0 : matches[5],
				this.hours = matches[7] === undefined ? 0 : matches[7],
				this.minutes = matches[8] === undefined ? 0 : matches[8],
				this.seconds = matches[9] === undefined ? 0 : matches[9];
			}
		};

		Duration.prototype.toString = function () {
			
			var str = 'P';
			
			if(this.years > 0){
				str += this.years+'Y';
			}
			
			if(this.months > 0){
				str += this.months+'M';
			}
			
			if(this.weeks > 0){
				str += this.weeks+'W';
			}
			
			if(this.days > 0){
				str += this.days+'D';
			}
			
			str += 'T';
			
			if(this.hours > 0){
				str += this.hours+'H';
			}
			if(this.minutes > 0){
				str += this.minutes+'M';
			}
			if(this.seconds > 0){
				str += this.seconds+'S';
			}

			// Remove the T from the end if it is the latest char
			if (str.charAt(str.length - 1) == 'T') {
				str = str.substr(0, str.length - 1);
			}

			return str;
		};
		
		return Duration;

	}]);
