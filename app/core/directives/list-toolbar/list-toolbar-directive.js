'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goListToolbar
 * @element div
 *
 * @description
 * Creates a toolbar for the list component. It supports multiselect and search
 * mode.
 * 
 * @param {GO.data.Store} store
 * @param int selectModeTrigger Trigger selection mode when this minimum of records has been selected.
 *
 * @example
 * <go-list-toolbar store="store" class="md-hue-1" select-mode-trigger="2">
 * 	<div class="md-toolbar-tools">
 * 		<md-button aria-label="{{::'Open side navigation'| goT}}" ng-click="toggleSidenav('left')" hide-gt-sm class="md-icon-button">
 * 			<md-icon>menu</md-icon>
 * 		</md-button>
 * 
 * 		<span flex></span>
 * 
 * 		<go-search-button></go-search-button>
 * 
 * 		<md-menu md-position-mode="target-right target">
 * 			<md-button aria-label="{{::'More options'| goT}}" class="md-icon-button" ng-click="$mdOpenMenu($event)">
 * 				<md-icon md-menu-origin>more_vert</md-icon>
 * 			</md-button>
 * 			<md-menu-content>
 * 				<md-menu-item>
 * 					<md-button ng-click="store.reload()">{{::"Refresh"| goT}}</md-button>
 * 				</md-menu-item>
 * 			</md-menu-content>
 * 		</md-menu>
 * 	</div>			
 * </go-list-toolbar>
 */

angular.module('GO.Core').directive('goListToolbar', [
	"$location",
	function ($location) {
		return {
			transclude: {
				'goSelect': '?goSelect',
				'goTools': 'goTools',
				'goSearch': '?goSearch'
			},
			restrict: 'E',
			scope: {
				store: '='
			},
			templateUrl: 'core/directives/list-toolbar/list-toolbar.html',
			controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
					this.enableSearch = function () {
						$scope.mode = "search";
					};
					
					this.getStore = function() {
						return $scope.store;
					};

					$scope.cls = $element.attr('class');
				}],
			link: function (scope, element, attrs) {

				var selectModeTrigger = attrs.selectModeTrigger ? parseInt(attrs.selectModeTrigger) : 2;

				scope.mode = 'default';
				function getMode(count) {

					if (typeof (count) === "undefined") {
						count = scope.store.selectionCount;
					}
					if (count >= selectModeTrigger) {
						scope.mode = 'select';
						return scope.mode;
					}

					if (!GO.isEmpty(scope.store.searchQuery)) {
						scope.mode = 'search';
						return scope.mode;
					}

					scope.mode = 'default';
					return scope.mode;
				}

				scope.$watch("store.selectionCount", getMode);

				//Get and set the search query in the location bar
				var search = $location.search();

				if (search['searchQuery']) {
					scope.store.searchQuery = search['searchQuery'];
				}


				scope.$watch("store.searchQuery", function (query, oldQuery) {
					if (query == oldQuery) {
						return;
					}
					scope.store.search();
					//getMode();
				});


				scope.reset = function () {
					scope.store.searchQuery = '';
				};

				scope.close = function () {
					scope.reset();
					scope.mode = 'default';
				};

			}
		};
	}]).directive('goListSelectionCount',[function(){
		return {
			require: '^^goListToolbar',
			restrict: 'E',
			template: '{{$parent.store.selectionCount}}'
		};
	}]).directive('goListSelectionClear',[function(){
		return {
			require: '^^goListToolbar',
			restrict: 'E',
			template: '<md-button ng-click="$parent.store.select()" class="md-icon-button"><md-icon>chevron_left</md-icon></md-button>'
		};
	}]).directive('goListSelectionDelete',[function(){
		return {
			require: '^^goListToolbar',
			restrict: 'E',
			template: '<md-button ng-click="$parent.store.deleteSelected()" class="md-icon-button"><md-icon>delete</md-icon></md-button>'
		};
	}]);





