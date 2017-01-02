'use strict';

angular.module('GO.Modules.GroupOffice.CustomFields').
				factory('GO.Modules.GroupOffice.CustomFields.Model.Model', [
						'GO.Core.Factories.Data.Model', 
						function (Model) {
						
						//Extend the base model and set default return proeprties
						var customFieldsModel = GO.extend(Model, function (baseParams) {
							
							this.$parent.constructor.call(this, arguments);

						});
						
						customFieldsModel.prototype.getStoreRoute = function() {
							return 'customfields/models';
						};
						
						
						
						return customFieldsModel;
					}]);