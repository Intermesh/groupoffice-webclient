'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Calendar').factory('GO.Modules.GroupOffice.Calendar.Calendar', [
	'GO.Core.Factories.Data.Model',
	function (Model) {
		var Calendar = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});

		Calendar.prototype.getStoreRoute = function () {
			return 'calendar';
		};
		Calendar.prototype.$returnProperties = "*,groups,defaultAlarms";

		Calendar.prototype.colors = function() {
			return {
				'ad1457': 'Pink',
				'6a1b9a': 'Purple',
				'4527a0': 'Deep Purple',
				'283593': 'Indigo',
				'1565c0': 'Blue',
				'0277bd': 'Light Blue',
				'00838f': 'Cyan',
				'00695c': 'Teal',
				'2e7d32': 'Green',
				'558b2f': 'Light green',
				'9e9d24': 'Lime',
				'f9a825': 'Yellow',
				'ff8f00': 'Amber',
				'ef6c00': 'Orange',
				'd84315': 'Deep Orange',
				'4e342e': 'Brown',
				'c62828': 'Red'
			};
		};
//
		return Calendar;
	}]);
