'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goMask
 * @element ANY
 *
 * @description
 * Show a mask to make an element disabled.
 *
 * @param {expression} active Expression to make it show or not
 * @example 
 * <go-mask ng-show="showMask"></go-mask> 
 */


angular.module('GO.Core')

				.directive('goMask', function() {
					return {
						restrict: 'E',
						transclude: true,
						template: '<div class="go-mask"><div class="backdrop"></div>\
							\
						<div class="msg" ng-transclude layout="row" layout-align="center center"></div></div>'
					};
				});


