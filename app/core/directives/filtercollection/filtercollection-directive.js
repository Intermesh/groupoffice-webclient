'use strict';
/**
 * @ngdoc directive
 * @name GO.Core.goFilterCollection
 * @element div
 * 
 * @description
 * Creates a filter collection used to filter a store. Typically used in the
 * side navigation
 * 
 * @param {string} goFilterCollection
 * @param {GO.Core.Factories.Data.Store} goStore
 * @param {function=} goOnLoad
 * 
 * @example
 *	<md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-md')">
 *		<div go-on-load="onFilterCollectionLoad(filterCollection)" go-filter-collection="contacts/filters" go-store="store" flex></div>
 *	</md-sidenav>
 */
angular.module('GO.Core')
				.directive('goFilterCollection', ['GO.Core.Directives.FilterCollection', '$location', '$state',function(FilterCollection,$location, $state) {
					return {
						scope: {
						    goFilterCollection: '@',
								goStore: '=',
								goOnLoad: '&'
						},
						link: function(scope, element) {			
							
		
							scope.filterCollection = new FilterCollection(scope.goFilterCollection, scope.goStore, scope.goOnLoad);
							
							//updates the query parameters when the state changes to a sub view/state
							scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
								$location.search(angular.extend($location.search(), scope.filterCollection.getFilterParams()));
							});
							
							
						},
						templateUrl: 'core/directives/filtercollection/filtercollection.html'
					};
				}]);