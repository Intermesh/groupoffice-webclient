'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goInfiniteScroll
 * @element ANY
 *
 * @description
 * Scroll an element infinitely
 *
 * @param {function} goInfiniteScroll function that should be called to load more items
 * @param {expression=} goInfiniteScrollDisabled {@link guide/expression Expression} that returns true or false to disable scrolling. Useful for pending AJAX requests.
 * @example View
 <div go-infinite-scroll="loadMore()" style="height:100px;overflow:auto">
	<div ng-repeat="item in items" style="border:1px solid grey;height:20px;">{{item.name}}</div>
 </div>
 
 * @example Controller
 angular.module('myExampleModule', ["GO.infiniteScroll"])
 .controller('ExampleController', ['$scope', function($scope) {
 
 $scope.items=[];
 
 $scope.loadMore = function() {
 for(var i=0;i<10;i++){
 $scope.items.push({name:"Item "+$scope.items.length});
 }
 };
 
 }]);
 </file>
 </example>
 */
angular.module('GO.Core').
		directive('goInfiniteScroll', [function () {
				return{
					scope: {
						goInfiniteScroll: '&',
						goInfiniteScrollDisabled: '='
					},
					link: function (scope, element, attr) {

						var
								lengthThreshold = attr.scrollThreshold || 200,
//								timeThreshold = attr.timeThreshold || 400;

						lengthThreshold = parseInt(lengthThreshold, 10);
//						timeThreshold = parseInt(timeThreshold, 10);


						var loading = false;
						var scrollEnabled = true;

						scope.$watch('goInfiniteScrollDisabled', function (v) {
							scrollEnabled = !v;
						});

						var scrollEl = element[0];
						
//						Don't know why this code was here???
//						
//						scope.scrollEl = scrollEl;						
//						scope.$watch('scrollEl.scrollHeight', function (v) {
//										
//							if(scrollEnabled && !loading && scrollEl.scrollHeight == scrollEl.clientHeight) {					
//								loading = true;
//
//								var promise = scope.goInfiniteScroll();
//								if(promise) {
//									promise.then(function(){
//										loading = false;
//										$timeout(checker, timeThreshold);
//									});
//								}
//							}
//						});

						var checker = function () {
// Bad for perfomance ?
//							if (!scrollEnabled) {
//								return $timeout(checker, timeThreshold);
//							}

							if(!scrollEnabled || loading) {
								return;
							}

							if (scrollEl.scrollTop > 0) {
								var remaining = scrollEl.scrollHeight - (scrollEl.clientHeight + scrollEl.scrollTop);

								if (remaining < lengthThreshold) {
									var promise = scope.goInfiniteScroll();
									if(promise) {
										loading = true;
										promise.then(function(){
											loading = false;
										});
									}
								}
							}
						};

//						checker();
						element.bind('scroll', checker);

					}

				};
			}]);