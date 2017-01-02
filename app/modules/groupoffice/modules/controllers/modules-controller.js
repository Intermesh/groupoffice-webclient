//'use strict';
//
///* Controllers */
//GO.module('GO.Modules.GroupOffice.Modules').
////				factory('moduleDescriptionReader', ["$http", function ($http) {
////					var factory = [];
////
////					factory.getXMLData = function () {
////						return $http.get("http://localhost/groupoffice-webclient/app/modules/groupoffice/modules/groupoffice/language/en.xml");
////					}
////
////					return factory;
////				}]).
//				controller('GO.Modules.GroupOffice.Modules.ModuleController', ['$scope', 'GO.Modules.GroupOffice.Modules.Module', function ($scope, Module) {
//
//						$scope.module = new Module();
//						$scope.store = $scope.module.getStore();
//						$scope.store.$storeRoute = 'modules/groupoffice/all';
//
//						$scope.store.load();
//
//						$scope.share = function (module) {
////							ShareModal.show(module);
//						};
//
//						$scope.install = function (module) {
//							module.$storeRoute = 'modules';
//							if (module.installed) {
//
//								module.reset();
//								module.deleted = false;
//
//								//module.id = null;
//								module.touchAttribute('name');
//								module.save();
//							} else
//							{
//
//								module.delete().then(function () {
//									module.installed = false;
//								});
//							}
//						};
//						
//						$scope.xml = function (module) {
//							var xmlData = module.getXMLData();
//							console.log(xmlData);
//							return xmlData;
//						};
//						
//						
////						loadModuleDescription();
////
////						function loadModuleDescription(){
////							moduleDescriptionReader.getXMLData().success(function(data){
////									console.log(data);
////							});
////						}
//					}])
//				;
