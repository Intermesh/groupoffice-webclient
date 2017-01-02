'use strict';

angular.module('GO.Core').factory('GO.Core.Factories.Models.Tag', [
	'GO.Core.Factories.Data.Model',
	function (Model) {
		var Tag = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});

		Tag.prototype.getStoreRoute = function () {
			return 'tags';
		};

		return Tag;
	}]);
