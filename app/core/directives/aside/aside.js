/**
 * @ngdoc directive
 * @name GO.Core.goHook
 * @element ANY
 *
 * @description
 * Create a template hook so the template can be customized
 * 
 * @see http://intermesh.io/index.php/Webclient/Hooks
 *
 * @param {name} The name of the hook
 * @example 
 * <go-hook name="main"></go-hook> 
 */


angular.module('GO.Core')
				.directive('aside', ["$rootScope", function($rootScope) {
					return {
						transclude: true,
						scope: false,
						template: '<div ng-click="toggleAside()" class="backdrop"></div><div class="content" ng-transclude></div>',
						link:function(scope, element){
							scope.$watch('showAside', function(v){								
								if(v) {
									element.addClass('active');
								}else
								{
									element.removeClass('active');
								}
							});
						}
					};
				}]).run(["$rootScope", function($rootScope){
					$rootScope.toggleAside = function() {
						$rootScope.showAside = !$rootScope.showAside;
					};
						
				}]);
			
