'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.CustomFields').controller('GO.Modules.GroupOffice.CustomFields.FieldsController', [
	'$scope',
	'$stateParams',
	'GO.Core.Factories.Data.Store',
	'GO.Core.Services.Dialog',
	'GO.Modules.GroupOffice.CustomFields.Model.Fieldset',
	'GO.Modules.GroupOffice.CustomFields.Model.Field',
	'$http',
	'GO.Core.Services.ServerAPI',
	function ($scope, $stateParams, Store, Dialog, fieldsetModel, fieldModel, $http, ServerAPI) {


		$scope.fieldModel = new fieldModel($stateParams.modelName, $stateParams.fieldSetId);

		$scope.fieldsStore = $scope.fieldModel.getStore({
			returnProperties: "*"
		});

		$scope.fieldsStore.load();



		/// dit moet met the store/model readIf() check gedaan worden!!!! 
		// @todo Moet het hier nog met merein over hebben !!!!
		// peren controller set the $scope.fieldsetModel alredy
		$scope.fieldsetModel.readIf('id', {fieldSetId: $stateParams.fieldSetId}).then(function (data) {
			$scope.fieldsetRec = data.model;
		});
		// eles to do !
//						$scope.fieldsetRec = $scope.fieldsetStore.findModelByAttribute('id', $stateParams.fieldSetId);


		$scope.customFieldTypes = fieldModel.customFieldTypes;






		$scope.editField = function (storeField, config) {
			var id = 0;
			if (storeField) {
				var id = storeField.id;
			}


			var config = config || {};


			var field = new fieldModel($stateParams.modelName, $stateParams.fieldSetId);

			field.read(id).then(function () {
				Dialog.show({
					editModel: field,
					templateUrl: 'modules/groupoffice/customfields/views/field-form.html',
					controller: 'GO.Modules.GroupOffice.CustomFields.FieldController',
					inputs: {
						config: config
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
			orderChanged: function (event) {//Do what you want
				var sort = [];
				for (var i = 0, l = $scope.fieldsStore.items.length; i < l; i++) {
//					$scope.fieldsStore.items[i][$scope.sortableOn] = i;

					sort.push({id: $scope.fieldsStore.items[i].id, sortOrder: i});
				}

				$http.put(ServerAPI.url('customfields/fieldsets/' + encodeURIComponent($stateParams.modelName)) + '/' + $stateParams.fieldSetId + '/fields', {data: sort});

			},
			//containment: '#board',//optional param.
			clone: false, //optional param for clone feature.
			allowDuplicates: false //optional param allows duplicates to be dropped.
		};

	}]);
