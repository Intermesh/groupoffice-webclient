'use strict';

angular.module('GO.Modules.GroupOffice.Imap').factory('GO.Modules.GroupOffice.Imap.Model.AutoDetect', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		//Extend the base model and set default return proeprties
		var AutoDetect = GO.extend(Model, function () {

			this.$parent.constructor.call(this, arguments);

		});

		AutoDetect.prototype.getStoreRoute = function () {
			return 'imap/autodetect';
		};
		
		AutoDetect.prototype.$keys = [];
		
		AutoDetect.prototype.isNew = function () {
			return true;
		};

		return AutoDetect;
	}]);

