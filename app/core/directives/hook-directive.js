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
				.directive('goHook', ['$injector', function($injector) {
					return {
						scope: false,
						template: function (tElement, tAttr) {
							
							GO.hooks.apply(tAttr.name, tElement, $injector);
							
							return tElement.innerHTML;
						}
					};
				}])			
		.decorator('$controller', ['$delegate', '$injector', function ($delegate, $injector) {
		return function (constructor, locals) {

			GO.hooks.applyControllerOverrides(constructor, locals, $injector);

			var controller = $delegate.apply(null, arguments);
			return controller;
		};
	}]);