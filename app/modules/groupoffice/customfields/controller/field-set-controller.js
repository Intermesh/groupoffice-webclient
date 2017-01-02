'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.CustomFields').controller('GO.Modules.GroupOffice.CustomFields.FieldSetController', [
	'$scope', 
	'$state', 
	'$stateParams', 
	'GO.Core.Services.Dialog', 
	'GO.Modules.GroupOffice.CustomFields.Model.Fieldset', 
	'GO.Modules.GroupOffice.CustomFields.Model.Model', function($scope, $state, $stateParams, Dialog, fieldsetModel, CustomFieldsModel){
								
				$scope.fieldsetModel = new fieldsetModel($stateParams.modelName);

				$scope.fieldsetStore = $scope.fieldsetModel.getStore({
						returnProperties: "id,name"
				});
				
				$scope.modelModel= new CustomFieldsModel();
				$scope.modelModel.readIf('modelName', {modelName: $stateParams.modelName}).then(function(data) {
					
					$scope.modeRec = data.model;
				});
				
				$scope.fieldsetStore.load();
				
				
				$scope.editFieldSet = function (fieldset) {
					
						if(!fieldset) {
							fieldset = new fieldsetModel($stateParams.modelName);
							fieldset.addStore($scope.fieldsetStore)
						}
						
						Dialog.show({
							editModel: fieldset,
							templateUrl: 'modules/groupoffice/customfields/views/field-set-form.html',
								controller: 'GO.Modules.GroupOffice.CustomFields.FieldSetController'

						}).then(function (modal) {
								modal.close.then(function (fieldset) {
									if(fieldset) {
										$state.go("customfields.fieldset.fields", {modelName: $stateParams.modelName, fieldSetId: fieldset.id});
									}											
								});
							});

						};
				
		}]);