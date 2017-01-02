'use strict';
/**
 * @ngdoc directive
 * @name GO.Core.goFiles
 * @element div
 * 
 * @description
 * Creates a files card for a display panel
 * 
 * @param {string} goControllerRoute
 * 
 * @example
 * <go-files go-controller-route="'contacts/'+contact.id+'/files'"></go-files>
 */
angular.module('GO.Core')

				.directive('goFiles', ['GO.Core.Services.ServerAPI', 'GO.Core.Directives.Files.File', '$mdToast', 'GO.Core.Providers.Translate', function (ServerAPI, File, $mdToast, Translate) {
						return {
							restrict: 'E',
							scope: {
								goControllerRoute: '='
							},
							templateUrl: 'core/directives/files/files.html',
							controller: ['$scope', '$element', '$attrs', '$transclude', 'GO.Core.Services.ServerAPI', function ($scope, $element, $attrs, $transclude, ServerAPI) {
									
								this.file = new File($scope.$eval($attrs.goControllerRoute));
								
								
								$scope.filesStore = this.file.getStore({
												returnProperties: 'id,name,deleted'
											});
								$scope.flowInit = ServerAPI.getFlowInit();
							}],
							link: function (scope, element, attrs, ctrl) {
									
//								scope.$watch('goControllerRoute', function(r, old) {									
//									if(r != old) {
//										scope.filesStore.$storeRoute = ctrl.file.$storeRoute = r;
//										scope.filesStore.load();
//									}
//								});							
//
//								scope.flowInit = ServerAPI.getFlowInit();								
//		
//
//								scope.uploadSuccess = function ($file, $message) {
//									var result = angular.fromJson($message);			
//									
//									var newFile = new File(ctrl.file.$storeRoute);
//									newFile.addStore(scope.filesStore);
//									
//									newFile.name = result.file;
//									newFile.tempPath = result.file;
//									newFile.save();	
//								};
//
//
////
//								scope.rename = function (file) {
//									var newName = prompt("Enter new name", file.name);
//									if(newName) {
//										file.name = newName;
//										file.save().then(function(data) {
//											$mdToast.show($mdToast.simple().position('top right').content(Translate.t("Saved successfully")));
//											
//										}, function(data) {
//											$mdToast.show($mdToast.simple().position('top right').content(Translate.t("Failed to save file")));
//											
//										});
//									}
//								};

							}
						};
					}]);