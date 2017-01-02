
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

angular.module('GO.Core').directive('goDateinterval', [
	'GO.Core.Factories.Util.Duration',
	'GO.Core.Providers.Translate',
	function (Duration, Translate) {

		return {
			restrict: 'E',
			transclude: true,
			scope: {
				label: '@',
				goModel: '='
//				enabledFields: '@'
			},
			link: function (scope, element, attr) {

				scope.viewScope = scope.$parent;

				if (!attr.enabledFields) {
					attr.enabledFields = 'YMWDHIS';
				}

				scope.duration = new Duration(scope.goModel);
				
				scope.$watch('goModel', function(goModel){
					scope.duration.setInterval(goModel);
				});
				
				scope.$watch('duration', function(duration){
					scope.goModel = duration.toString();
				}, true);
				
				scope.units = [];

				if (attr.enabledFields.indexOf('Y') > -1) {
					scope.units.push({key: "years", name: Translate.t("Years")});
				}
				if (attr.enabledFields.indexOf('M') > -1) {
					scope.units.push({key: "months", name: Translate.t("Months")});
				}
				if (attr.enabledFields.indexOf('W') > -1) {
					scope.units.push({key: "weeks", name: Translate.t("Weeks")});
				}
				if (attr.enabledFields.indexOf('D') > -1) {
					scope.units.push({key: "days", name: Translate.t("Days")});
				}
				if (attr.enabledFields.indexOf('H') > -1) {
					scope.units.push({key: "hours", name: Translate.t("Hours")});
				}
				if (attr.enabledFields.indexOf('I') > -1) {
					scope.units.push({key: "minutes", name: Translate.t("Minutes")});
				}
				if (attr.enabledFields.indexOf('S') > -1) {
					scope.units.push({key: "seconds", name: Translate.t("Seconds")});
				}

			},
			templateUrl: 'core/directives/form/dateinterval/dateinterval.html'
		};
	}]);