'use strict';

angular.module('GO.Core').factory('GO.Modules.GroupOffice.Cron.Model.Job', [
	'GO.Core.Factories.Data.Model',
	function (Model) {

		//Extend the base model and set default return proeprties
		var Job = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		
		Job.prototype.getStoreRoute = function() {
			return 'cron/jobs';
		};		
		
		return Job;
	}]);


