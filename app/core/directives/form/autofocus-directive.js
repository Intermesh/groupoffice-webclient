'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goAutofocus
 * @element input
 *
 * @description
 * Put autofocus on an input. The standard autofocus attribute doesn't work on
 * firefox
 *
 * @example
     <input ng-model="text" go-autofocus="{expersion}">
	
 */

angular.module('GO.Core')
				.directive('goAutofocus', ['$timeout',function($timeout) {
					return {
						link: function(scope, element, attr) {
						
							scope.$watch(attr.goAutofocus, function(value) {
								if(value || angular.isUndefined(value)){								
									$timeout(function() {
										element[0].focus();
									}, 100); //Delay to allow transition. Wierd stuff happens when you use transition (at least with transform: translateX and autofocus at the same time.
								}
							});

						}
					};
				}]);