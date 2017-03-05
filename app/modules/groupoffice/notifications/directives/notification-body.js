
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

					var config = App.notificationTemplates[scope.model.about.name] && App.notificationTemplates[scope.model.about.name][scope.model.type] ? App.notificationTemplates[scope.model.about.name][scope.model.type] : {template: 'missing tpl: {{scope.model.about.name}} - {{scope.model.type}}'};
					
					if(config.templateUrl) {
						config.template = '<div ng-include="\'' + config.templateUrl + '\'"></div>';
					}
					
					element.html(config.template);
					$compile(element.contents())(scope);

			},
			scope: true,
			restrict: 'A'
		};
	}]);

