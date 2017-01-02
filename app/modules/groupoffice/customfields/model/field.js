'use strict';

angular.module('GO.Modules.GroupOffice.CustomFields').factory('GO.Modules.GroupOffice.CustomFields.Model.Field', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		var Field = GO.extend(Model, function (modelName, fieldSetId) {
			
			this.$parent.constructor.call(this, arguments);
			
			this.$modelName = modelName;
			this.fieldSetId = fieldSetId;
		});

		Field.prototype.getStoreRoute = function () {
			return 'customfields/fieldsets/' + encodeURI(this.$modelName) + '/' + this.fieldSetId + '/fields';
		};

		/**
		 * available type name and icons  by field
		 */
		Field.customFieldTypes = [
			{
				value: 'text',
				label: 'Text field',
				icon: 'mdi mdi-textbox'
			}, {
				value: 'select',
				label: 'Select',
				icon: 'mdi mdi-missing'
			}, {
				value: 'checkbox',
				label: 'Check box',
				icon: 'mdi mdi-checkbox-marked-outline'
			}, {
				value: 'date',
				label: 'Date',
				icon: 'mdi mdi-timetable'
			}, {
				value: 'number',
				label: 'Number',
				icon: 'mdi mdi-numeric'
			}
		];


		/**
		 * Get the icon by field type 
		 * @see Field.customFieldTypes array()
		 * 
		 * @returns {Field@arr;customFieldTypes.icon}
		 */
		Field.prototype.getIcon = function () {
			for (var i = 0; i < Field.customFieldTypes.length; i++) {
				var item = Field.customFieldTypes[i];
				if (this.type == item.value) {
					return item.icon;
				}
			}
		};


		return Field;
	}]);