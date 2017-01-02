'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.CustomFields').

				controller('GO.Modules.GroupOffice.CustomFields.ModelsController', ['$scope', '$state', '$http', 'GO.Core.Providers.Translate', 'GO.Core.Services.ServerAPI', 'GO.Core.Factories.Data.Store', 'GO.Modules.GroupOffice.CustomFields.Model.Model', function($scope,$state, $http, Translate, Utils, Store, CustomFieldsModel) {

		
						$scope.customFieldsModel = new CustomFieldsModel();
						
						$scope.modelsStore = $scope.customFieldsModel.getStore({
								returnProperties: "*"
						});
						
						$scope.modelsStore.load();
					}]);


