'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Log').factory('GO.Modules.GroupOffice.Log.Model.Entry', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		var Entry = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});

		Entry.prototype.getStoreRoute = function () {
			return 'log';
		};

		return Entry;
	}]);

