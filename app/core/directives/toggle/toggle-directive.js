'use strict';

angular.module('GO.Core')
				.directive('toggle', [function () {
						return {
							restrict: 'E',
							transclude: true,						
							templateUrl: 'core/directives/toggle/toggle.html',
							controller: ['$scope', 'GO.Core.Providers.Translate', function ($scope,Translate) {
									
									$scope.useReadMore = !angular.isUndefined($scope.moreText);
									
									if($scope.useReadMore && angular.isUndefined($scope.lessText)){
										$scope.lessText = Translate.t("Read less ...");
									}

									$scope.hideFull = true;
									$scope.toggleFull = function () {
										$scope.hideFull = $scope.hideFull === false ? true : false;
									};

								}],
//		controllerAs: 'toggle',
							scope: {
								moreText: "@moreText",
								lessText: "@lessText",
								cut: "@cut"
							}
						};
					}])
				
				.directive('full', [function(){
						return {
							restrict: 'E',
							require: '^toggle',
							transclude: true,
							scope: false,
							template: '<div class="full" ng-show="!$parent.hideFull" ng-transclude></div>'
						};
				}])
			.directive('summary', [function(){
						return {
							restrict: 'E',
							require: '^toggle',
							transclude: true,
							scope: false,
							template: '<div class="summary" ng-transclude ng-class="$parent.hideFull ? \'close\' : \'open\'"></div>'
						};
				}]);