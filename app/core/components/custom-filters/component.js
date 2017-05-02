'use strict';
/**
 * 
 * @description The add-view must supply a comparator, field and value to query
 * @type type
 * @example 
 * `````````````````````````````````````````````````````````````````````````````
 * <go-custom-filters add-view='modules/groupoffice/contacts/views/add-filter.html' on-change='onCustomFiltersChange(filters, q)'></go-custom-filters>
 * `````````````````````````````````````````````````````````````````````````````
 */
GO.module('GO.Core').component('goCustomFilters', {
	bindings: {
		onChange: '&',
		properties: '<',
		onReady: '&'
		
	},
	controller: [
		'$scope',
		'$mdDialog',
		function ($scope, $mdDialog) {

			this.filters = [];
			this.deleteFilter = function (index) {
				this.filters.splice(index, 1);
				ctrl.onChange({filters: ctrl.filters, q: buildQ()});
			};
			
			var ctrl = this;
			
			this.$onInit = function () {
				this.onReady({ctrl: ctrl});
			};
			
			
			function buildQ() {
				
				var q = [];
				
				angular.forEach(ctrl.filters, function (c) {
					
					var where = {};
					where[c.field] = c.query;

					var parts = c.field.split('.');
					if (parts.length > 1) {
						parts.pop();
						var rel = parts.join('.');
						q.push(['joinRelation', rel]);
					}

					q.push(['andWhere', [c.comparator, where]]);
				});
				
				return q;
			}
			
			this.add = function(field, query, comparator, label, icon, onClick) {
				ctrl.filters.push({field: field, query: query, comparator: comparator, label: label, icon: icon, onClick: onClick});						
				ctrl.onChange({q: buildQ(), filters: ctrl.filters});
			};


			this.click = function(filter) {
				if(filter.onClick) {
					filter.onClick();
				};
			};

			this.addFilter = function () {
				$mdDialog.show({
					locals: {
						properties: this.properties
					},
					controller: ['$scope', '$mdDialog', 'properties', function ($scope, $mdDialog, properties) {
							$scope.hide = function () {
								$mdDialog.hide();
							};
							
							$scope.properties = properties;							

							$scope.model = {field: Object.keys(properties)[0], query: null, comparator: '=', label: null};
							
							$scope.$watch('model.field', function(newValue) {
								$scope.model.query = properties[newValue].defaultValue || null;
							});

							$scope.save = function () {
								
								$scope.model.label = properties[$scope.model.field].label+ ' ' + $scope.model.comparator + ' ' + $scope.model.query;
								$scope.model.icon = 'star';
								
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
										ctrl.onChange({q: buildQ(), filters: ctrl.filters});
									}

								});
			};

		}],
	templateUrl: 'core/components/custom-filters/component.html'
});
