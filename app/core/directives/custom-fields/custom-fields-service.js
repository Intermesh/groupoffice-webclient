'use strict';

angular.module('GO.Core').
		service('GO.Core.Directives.CustomFields', ['GO.Core.Factories.Data.Store', function(Store) {

				var loadedFieldSets = {};

				var CustomFields = function() {


				};


				CustomFields.prototype.getFieldSetStore = function(modelName) {


					if (!loadedFieldSets[modelName]) {

						loadedFieldSets[modelName] = new Store(
								'customfields/fieldsets/'+encodeURI(modelName),
								{
									returnProperties: '*,fields',
									limit: 0
								});

						loadedFieldSets[modelName].load();
					}

					return loadedFieldSets[modelName];


				};

				return new CustomFields;
			}]);