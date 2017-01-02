


'use strict';

angular.module('GO.Core')

		.directive('goSearchButton', ['$compile', function ($compile) {
				return {
					restrict: 'E',
					require: "^goListToolbar",		
					scope: true,
					replace: false,
					link: function (scope, element, attrs, goListToolbar) {
						scope.enableSearch = goListToolbar.enableSearch;
					},
					template: '<md-button accesskey="s" ng-click="enableSearch()" class="md-icon-button"><md-icon>search</md-icon><md-tooltip>{{::"Search" | goT}} (Alt+s)</md-tooltip></md-button>'
				};
			}]);