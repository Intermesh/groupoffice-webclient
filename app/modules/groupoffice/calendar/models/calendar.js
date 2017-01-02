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

		Calendar.prototype.colors = function() {
			return {
				'5484ed': 'Bold blue',
				'a4bdfc': 'Blue',
				'46d6db': 'Turquoise',
				'7ae7bf': 'Green',
				'51b749': 'Bold green',
				'fbd75b': 'Yellow',
				'ffb878': 'Orange',
				'ff887c': 'Red',
				'dc2127': 'Bold red',
				'dbadff': 'Purple',
				'e1e1e1': 'Gray'
			};
		};
//
		return Calendar;
	}]);
