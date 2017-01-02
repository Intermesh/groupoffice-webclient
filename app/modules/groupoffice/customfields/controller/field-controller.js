'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.CustomFields')
		.controller('GO.Modules.GroupOffice.CustomFields.FieldController', ['$scope', 'GO.Core.Factories.Data.Model', '$state',   'close', 'read', 'config', 'GO.Modules.GroupOffice.CustomFields.Model.Field',function ($scope, Model, $state,   close, readPromise, config, fieldModel) {
	
				
				
				readPromise.then(function () {
					
					$scope.model.setAttributes(config);
					
					if (!$scope.model.data) {
						$scope.model.data = {};
					}
					
					$scope.options = [];
					
					if ($scope.model.data.options) {
						for(var i = 0, l = $scope.model.data.options.length; i < l; i++) {
							$scope.options.push({
								value: $scope.model.data.options[i]
							});
						}
					}
				});

				$scope.customFieldTypes = fieldModel.customFieldTypes
				
				var origSave = $scope.save;

				$scope.save = function () {
					
					$scope.model.data.options = [];
					for(var i = 0, l = $scope.options.length; i < l; i++) {
						$scope.model.data.options.push($scope.options[i].value);
					}
					return origSave();
				};
				
			}]);
