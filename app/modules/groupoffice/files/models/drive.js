'use strict';

angular.module('GO.Modules.GroupOffice.Files')
	.factory('GO.Modules.GroupOffice.Files.Model.Drive', [
		'GO.Core.Factories.Data.Model',
		'$http',
		'GO.Core.Services.ServerAPI',
		function (Model, $http, ServerAPI) {

		//Extend the base model and set default return proeprties
		var Drive = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});

		Drive.prototype.$returnProperties = "*,groups";

		Drive.prototype.usage = 0;
		Drive.prototype.quota = 0;

		Drive.prototype.getStoreRoute = function() {
			return 'drives';
		};

		Drive.prototype.save = function() {
			return this.$parent.save.call(this, arguments);
		};

		Drive.prototype.percentage = function() {
			return Math.round((100/this.quota)*this.usage);
		};

		Drive.prototype.mount = function() { //bool
			return $http.post(ServerAPI.url('drives/'+this.id+'/mount',{mount:this.isMounted=='0'?false:true}));
		};

		return Drive;
	}]);
