'use strict';

angular.module('GO.Modules.GroupOffice.Files')
	.factory('GO.Modules.GroupOffice.Files.Model.Drive', [
		'GO.Core.Factories.Data.Model',
		function (Model) {

		//Extend the base model and set default return proeprties
		var driveModel = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});


		driveModel.prototype.getStoreRoute = function() {
			return 'drives';
		};

		return driveModel;
	}]);
