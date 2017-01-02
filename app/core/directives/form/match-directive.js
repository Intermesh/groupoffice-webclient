'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goMatch
 * @element input
 *
 * @description
 * Match two password fields
 *
 * @example
 
 <form name="userForm"  novalidate>
 <input type="password" ng-model="password" autocomplete="off" />
 <input type="password" name="passwordConfirm" ng-model="passwordConfirm"  go-match="password" autocomplete="off" />
 <p style="color:red" ng-show="userForm.passwordConfirm.$error.imMatch">The passwords don't match.</p>
 </form>
 
 */
angular.module('GO.Core').directive('goMatch', function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		scope: {
			goMatch: '='
		},
		link: function (scope, elem, attrs, ctrl) {
			scope.$watch(function () {
				return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.goMatch === ctrl.$modelValue;
			}, function (currentValue) {
				ctrl.$setValidity('goMatch', currentValue);
			});
		}
	};
});