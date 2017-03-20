
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


angular.module('GO.Modules.GroupOffice.Notifications').directive('goNotificationsButton', [

	function () {
		return {
			controller: [
				"$scope",
				'GO.Modules.GroupOffice.Notifications.Services.Notifications',
				'$mdSidenav',
				function ($scope, Notifications, $mdSidenav) {

					$scope.notifications = Notifications;

					$scope.showPanel = function () {
						Notifications.showPanel();
					};

//						$scope.showPanel = function ($event) {
//
//							var panelPosition = $mdPanel.newPanelPosition()
//										.relativeTo('#notify')
//								     .addPanelPosition($mdPanel.xPosition.ALIGN_END, $mdPanel.yPosition.ALIGN_TOPS);
//							 
//							var panelAnimation = $mdPanel.newPanelAnimation()											
//											.withAnimation($mdPanel.animation.SCALE)
//											.openFrom('#notify')
//											.closeTo('#notify');
//
//							var config = {
//								position: panelPosition,
//								animation: panelAnimation,
//								attachTo: angular.element(document.body),
//								controller: 'GO.Modules.GroupOffice.Notifications.Controller.Popup',
//								targetEvent: $event,
//								templateUrl: 'modules/groupoffice/notifications/directives/popup.html',
//								clickOutsideToClose: true,
//								escapeToClose: true,
//								focusOnOpen: true
//							};
//							var panelRef = $mdPanel.create(config);
//							
//							panelRef.open()
//											.finally(function () {
//												panelRef = undefined;
//											});
//						};
				}],
			scope: true,
			templateUrl: 'modules/groupoffice/notifications/directives/notifications-button.html',
			restrict: 'E'
		};
	}]);
