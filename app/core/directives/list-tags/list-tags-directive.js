'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goListTags
 * @element div
 *
 * @description
 * Creates a component for displaying tags inside a list item in the list component.
 *
 * @example
 * <go-list-tags model="model">
 * 	<div class="tags">
 *		<div class="tag"></div>
 * 	</div>			
 * </go-list-tags>
 */

angular.module('GO.Core')
				.directive('goListTags', [function () {
						return {
							transclude: true,
							restrict: 'E',
							scope: {
								tags: '='
							},
							templateUrl: 'core/directives/list-tags/list-tags.html'

						};
					}]);