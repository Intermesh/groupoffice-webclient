'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.CustomFields').controller('GO.Modules.GroupOffice.CustomFields.FieldSetController', [
	'$scope', 
	'$state', 
	'$stateParams', 
	'GO.Core.Services.Dialog', 
	'GO.Modules.GroupOffice.CustomFields.Model.Fieldset', 
	'GO.Modules.GroupOffice.CustomFields.Model.Model', 
	'$http',
	'GO.Core.Services.ServerAPI',
	function($scope, $state, $stateParams, Dialog, fieldsetModel, CustomFieldsModel, $http,ServerAPI){
								
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
				
				$scope.dragControlListeners = {
						accept: function (sourceItemHandleScope, destSortableScope) {
							return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
						},
						itemMoved: function (event) {//Do what you want
						},
						orderChanged: function(event) {//Do what you want
							var sort = [];
							for(var i=0,l=$scope.fieldsetStore.items.length;i<l;i++) {
//								$scope.fieldsetStore.items[i][$scope.sortableOn] = i;
								
								sort.push({id: $scope.fieldsetStore.items[i].id, sortOrder: i});
							}
							
							$http.put(ServerAPI.url( 'customfields/fieldsets/' + encodeURIComponent($stateParams.modelName)), {data: sort});
							
						},
						//containment: '#board',//optional param.
						clone: false, //optional param for clone feature.
						allowDuplicates: false //optional param allows duplicates to be dropped.
				};
		}]);