
/**
 * @ngdoc directive
 * @name GO.Core.goNumber
 * @element input
 * 
 * @description
 * An input field with where you can enter numeric values
 * 
 * @example
 *	<input id="number" name="number" ng-model="formModel.number" go-number />
 */

angular.module('GO.Core').directive('goNumber', [
	'$filter',
	'$locale',
	function ($filter, $locale) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ngModel) {

				element.addClass('go-number');

				//Autoselect value
				element.bind('focus', function (event) {	
					event.target.select();
				});
				
				element.bind('mouseup', function(event) {
					// see http://stackoverflow.com/questions/15788617/html-text-input-select-all-content-on-focus-not-working-in-chrome
					event.preventDefault();
				});

				element.attr('type', 'text');
				element.attr('pattern', '\\d*');

				var decN = scope.$eval(attr.decimalPlaces); // this is the decimal-places attribute


				// http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
				function theDecimalPlaces(num) {
					var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
					if (!match) {
						return 0;
					}
					return Math.max(
									0,
									// Number of digits right of decimal point.
													(match[1] ? match[1].length : 0)
													// Adjust for scientific notation.
													- (match[2] ? +match[2] : 0));
				}

				function fromUser(text) {
					if (text === "") {
						//empty text means clear the value
						return null;
					}

					var x = text.split($locale.NUMBER_FORMATS.GROUP_SEP).join('');
					var y = x.split($locale.NUMBER_FORMATS.DECIMAL_SEP).join('.');

					return Number(y); // return a model-centric value from user input y
				}

				function toUser(n) {
					var v= $filter('number')(n, decN); // locale-aware formatting					
					return v;
				}



				ngModel.$parsers.unshift(fromUser);
				ngModel.$formatters.unshift(toUser);



				element.bind('blur', function () {
					element.val(toUser(ngModel.$modelValue));
				});

				element.bind('focus', function () {
					var n = ngModel.$modelValue;
					var formattedN = $filter('number')(n, theDecimalPlaces(n));
					element.val(formattedN);
				});

			} // link
		}; // return
	}]); // module