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
angular.module('GO.Core').directive('goFilter', ['$location', '$state', function ($location, $state) {
		return {
			scope: {
				name: '@',
				type: '@',
				goValue: '<',
				onChange: '&'
			},
			transclude: true,
			controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
					this.name = $scope.name;
					this.type = $scope.type;

//					if(this.type==='multiselect' && angula) {
//						$scope.goValue = [];
//					}else
//					{
//						$scope.goValue = null;
//					}

					this.getValue = function() {
						return $scope.goValue;
					};
					
					this.setValue =function (v) {
						
						var searchParams = $location.search();
						
						if(this.type==='multiselect') {
							if(!GO.isEmpty(v)) {
								
								var index = $scope.goValue.indexOf(v);
								
								if(index===-1) {
									$scope.goValue.push(v);
								}else
								{
									$scope.goValue.splice(index, 1);
								}
								
							}
							
							searchParams[this.name] = $scope.goValue.join(',');
						}else
						{
							$scope.goValue = v;
							searchParams[this.name] = v;
							
						}					
						
						$location.search(searchParams);
						
						if($scope.onChange) {
							$scope.onChange({value: this.getValue()});
						}
					};
					
					var searchParams = $location.search();
					if(searchParams[name]) {						
						if(this.type==='multiselect') {
							$scope.goValue = searchParams[name].split(',');
						}else
						{
							$scope.goValue = searchParams[name];
						}
					}
				}],
			link: function (scope, element) {



				//updates the query parameters when the state changes to a sub view/state
//							scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//								$location.search(angular.extend($location.search(), scope.filterCollection.getFilterParams()));
//							});



			},
			templateUrl: 'core/directives/filter/filter.html'
		};
	}]).directive('goOption', ['$location', '$state', function (FilterCollection, $location, $state) {
		return {
			scope:true,
			require: '^^goFilter',			
			template: function (tElement, tAttr) {				
				var str = '<md-list-item ng-class="{selected: isSelected()}" ng-click="toggle()">'+tElement[0].innerHTML+'</md-list-item>';
				return str;
			},
			link: function (scope, element, attr, goFilterCtrl) {
				
				scope.value = attr.value;
				
				 if (angular.isDefined(attr.goValue)) {
					scope.$watch(attr.goValue, function(v){
						scope.value = v;
					});
				}
								
				
				scope.isSelected = function () {
					if(goFilterCtrl.type=='multiselect')
					{
						return goFilterCtrl.getValue().indexOf(scope.value) != -1;
					}else
					{
						return goFilterCtrl.getValue() == scope.value;
					}
				};

				scope.toggle = function () {
					goFilterCtrl.setValue(scope.value);
				};

			}
//			templateUrl: 'core/directives/filter/option.html'
		};
	}]);