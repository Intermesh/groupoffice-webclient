
/**
 * @ngdoc directive
 * @name GO.Core.goDateinterval
 * @element input
 * 
 * @description
 * An input field with where you can enter numeric values
 * 
 * @example
 *	<go-dateinterval go-model='' enabled-fields='YMWDHIS' ></go-dateinterval>
 */

angular.module('GO.Core').directive('goDatePicker', [
	'$timeout',
	function ($timeout) {

		return {
			restrict: 'E',
			transclude: true,
			require: "ngModel",
			scope: {
				label: '@',
//				ngModel: '=',
				ngRequired: '=?',
//				enabledFields: '@'
				ngDisabled: '=?'
			},
			link: function (scope, element, attr, ngModel) {

				scope.ngModel = ngModel;

//				scope.ngModel = scope.ngModel || new Date();

				ngModel.$render = function () {

					if (ngModel.$viewValue) {
						update();
					} else
					{
						scope.year = scope.month = scope.day = "";
					}
				};

				function update() {
					scope.year = ngModel.$viewValue.getFullYear();
					scope.month = ngModel.$viewValue.getMonth() + 1; //md-select doesn't accept 0 as a value so we incremnt to 1-12
					scope.day = ngModel.$viewValue.getDate();
				}




				var days = [];
				for (var i = 1; i < 32; i++) {
					days.push(i);
				}

				var years = [];
				var currentYear = new Date().getFullYear();
				var maxYear = currentYear + 20;
				var oldestYear = currentYear - 120;
				for (var i = maxYear; i >= oldestYear; i--) {
					years.push(i);
				}
				
				scope.years = years;
				scope.days = days;

				scope.openYear = function() {
					if(!scope.year) {
						scope.year = currentYear;
					}
				};

				scope.$watch('year', function (year) {

//						console.log(year);

					if (!year) {
						ngModel.$setViewValue(null);
						return;
					}

					var date = ngModel.$viewValue ? ngModel.$viewValue : new Date();
					date.setFullYear(year);
					ngModel.$setViewValue(date);
					update();
					
					ngModel.$setTouched();

				});

				scope.$watch('month', function (month) {

					if (!month) {
						ngModel.$setViewValue(null);
						return;
					}

					var date = ngModel.$viewValue ? ngModel.$viewValue : new Date();
					date.setMonth(month - 1);

					ngModel.$setViewValue(date);
					update();
					
					ngModel.$setTouched();
				});

				scope.$watch('day', function (day) {

					if (!day) {
						ngModel.$setViewValue(null);
						return;
					}

					var date = ngModel.$viewValue ? ngModel.$viewValue : new Date();
					date.setDate(day);

					ngModel.$setViewValue(date);
					update();
					
					ngModel.$setTouched();
				});

			},
			templateUrl: 'core/directives/form/datepicker/datepicker.html'
		};
	}]);
