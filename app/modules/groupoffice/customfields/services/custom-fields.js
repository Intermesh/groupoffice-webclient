'use strict';

angular.module('GO.Core').service('GO.Modules.CustomFields.Services.CustomFields', [
	'GO.Modules.GroupOffice.CustomFields.Model.Fieldset',
	function (Fieldset) {

		var CustomFields = function () {

		};

		CustomFields.prototype.loadFilterOptions = function (modelName, filterOptions) {
			
		
			var me = this;
			
			return (new Fieldset(modelName)).getStore({
				returnProperties: 'id,fields'
			}).load().then(function(data) {
				
				angular.forEach(data.store.items, function(fieldset) {
					
					me._loadFieldSet(fieldset, filterOptions);
				});
				
				return filterOptions;
			});
		};
		
		CustomFields.prototype._loadFieldSet = function(fieldset, filterOptions) {
			
			angular.forEach(fieldset.fields, function(field) {
				

				filterOptions['customfields.'+field.databaseName] = {
					label: field.name,
					editorTpl: "core/components/custom-filters/editors/text.html"
				};
			});
			
			return filterOptions;
			
		};

		return new CustomFields;
	}]);
