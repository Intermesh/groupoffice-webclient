'use strict';
/**
 * 
 * @description The add-view must supply a comparator, field and value to query
 * @type type
 * @example 
 * `````````````````````````````````````````````````````````````````````````````
 * <go-custom-filters add-view='modules/groupoffice/contacts/views/add-filter.html' on-change='onCustomFiltersChange(filters)'></go-custom-filters>
 * `````````````````````````````````````````````````````````````````````````````
 */
GO.module('GO.Core').component('goCustomFilters', {
	bindings: {
		onChange: '&',
		addView: '@'
	},
	controller: [
		'$scope',
		'$mdDialog',
		function ($scope, $mdDialog) {

			this.filters = [];
			this.deleteFilter = function (index) {
				this.filters.splice(index, 1);
				ctrl.onChange({filters: ctrl.filters});
			};
			
			var ctrl = this;


			this.addFilter = function () {
				$mdDialog.show({
					controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
							$scope.hide = function () {
								$mdDialog.hide();
							};
							
							$scope.addView = ctrl.addView;


							$scope.model = {field: null, query: [], comparator: '='};

							$scope.save = function () {
								$mdDialog.hide($scope.model);
							};
						}],
					templateUrl: 'core/components/custom-filters/add-filter.html',

					clickOutsideToClose: true,
					fullscreen: true
				})
								.then(function (model) {
									if (model) {
										ctrl.filters.push(model);
										ctrl.onChange({filters: ctrl.filters});
									}

								});
			};

		}],
	templateUrl: 'core/components/custom-filters/component.html'
});
