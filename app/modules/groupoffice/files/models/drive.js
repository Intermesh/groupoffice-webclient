'use strict';

angular.module('GO.Modules.GroupOffice.Files')
	.factory('GO.Modules.GroupOffice.Files.Model.Drive', [
		'GO.Core.Factories.Data.Model',
		'$http',
		'GO.Core.Services.ServerAPI',
		function (Model, $http, ServerAPI) {

		//Extend the base model and set default return proeprties
		var driveModel = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});
		driveModel.prototype.usage = 0;
		driveModel.prototype.quota = 0;

		driveModel.prototype.getStoreRoute = function() {
			return 'drives';
		};

		driveModel.prototype.percentage = function() {
			return Math.round((100/this.quota)*this.usage);
		};

		driveModel.prototype.mount = function() { //bool
			return $http.post(ServerAPI.url('drives/'+this.id+'/mount',{mount:this.isMounted=='0'?false:true}));
		};

		return driveModel;
	}]);
