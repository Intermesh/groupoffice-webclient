
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


angular.module('GO.Modules.GroupOffice.Notifications').directive('goNotificationBody', [
	'GO.Core.Services.Application',
	'$compile',
	function (App, $compile) {
		return {
			link: function (scope, element, attrs) {
//				scope.$watch('model',function (model) {				
//					
//					if (!scope.model) {
//						return;
//					}				
//					
					var tpl = App.notificationTemplates[scope.model.about.name] && App.notificationTemplates[scope.model.about.name].tpl[scope.model.type] ? App.notificationTemplates[scope.model.about.name].tpl[scope.model.type] : 'missing tpl: {{scope.model.about.name}} - {{scope.model.type}}';
					element.html(tpl);
					$compile(element.contents())(scope);
//				}, true);
			},
			scope: {
				model: '=goNotificationBody'
			},
			restrict: 'A'
		};
	}]);

