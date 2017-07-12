
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

					if(scope.model.fromClient) {
						var config = scope.model;
					}else
					{
						var config = App.notificationTemplates[scope.model.about.name] && App.notificationTemplates[scope.model.about.name][scope.model.type] ? App.notificationTemplates[scope.model.about.name][scope.model.type] : null;
						
						if(!config) {
							config = App.notificationTemplates["*"] && App.notificationTemplates["*"][scope.model.type] ? App.notificationTemplates["*"][scope.model.type] : null;
						}
						
						if(!config) {
							config = {template: 'missing tpl: {{model.about.name}} - {{model.type}}'};
						}
					}
					
					var tpl = '<div';
					
					if(config.templateUrl) {
						tpl += ' ng-include="\'' + config.templateUrl + '\'"';
					}
					
					if(config.controller) {
						tpl += ' ng-controller="' + config.controller + '"';
					}
					
					tpl += '>';
					
					if(config.template) {
						tpl += config.template;
					}
					
					tpl += '</div>';
					
					element.html(tpl);
					if(scope.model.fromClient) {
						var child = scope.$new(true);
						angular.extend(child, scope.model.locals);
						
						$compile(element.contents())(child);
					}else
					{
						$compile(element.contents())(scope);
					}

			},
			scope: true,
			restrict: 'A'
		};
	}]);

