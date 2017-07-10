/**
 * Whenever a store attribute is used it will automatically update when a model is updated.
 * 
 * @type type
 */
angular.module('GO.Core').
				directive('store', ['$parse', function ($parse) {
						return{
							link: function (scope, element, attr) {
								//				//this automatically updates the store when a model is updated.

								

								scope.$on('modelupdate', function (event, updatedModel) {
									
									var store = $parse(attr.store)(scope);
									
//								if (updatedModel.getStoreRoute() === store.$storeRoute) {
									if (Object.getPrototypeOf(updatedModel) === store.$modelProto) {										
										store.updateModel(updatedModel);
									}
								});
							}
						};
					}]);
