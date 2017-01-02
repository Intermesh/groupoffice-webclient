//'use strict';
//
///* Controllers */
//angular.module('GO.Modules.GroupOffice.CustomFields').
//		controller('GO.Modules.GroupOffice.CustomFields.ModelController', ['$scope', '$stateParams', 'GO.Core.Factories.Data.Store', 'GO.Core.Providers.ClientModules', '$state', function($scope, $stateParams, Store, Modal, $state) {
//				
//				$scope.modelName = $stateParams.modelName;
//				$scope.fieldSetStore = new Store(
//						'customfields/fieldsets/'+encodeURI($stateParams.modelName),
//						{
//							limit: 0
//						}
//				);
//
//				$scope.fieldSetStore.load();
//
//				$scope.dragControlListeners = {
//					orderChanged: function (event) {
//						$scope.fieldSetStore.orderChanged(event);
//					},
//					accept:function(sourceItemHandleScope, destSortableScope, destItemScope) {
//						return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
//					}
//				};
//
//
//				$scope.edit = function (fieldSetId) {
//							Modal.show({
//								templateUrl: 'modules/groupoffice/customfields/views/field-set.html',
//								controller: 'GO.Modules.GroupOffice.CustomFields.FieldSetController',
//								inputs: {
//									fieldSetId: fieldSetId,
//									modelName: $stateParams.modelName									
//								}
//							}).then(function (data) {
//								data.close.then(function (fieldSet) {
//									if(fieldSet) {
//										$scope.fieldSetStore.load();
//									}
//								});
//
//							});
//						};
//				
//				
//		
//		
//				
//				$scope.onDelete = function(result){					
//					$state.go("customfields.model", $stateParams);
//						
//				};
//
//			}]);
//
//
