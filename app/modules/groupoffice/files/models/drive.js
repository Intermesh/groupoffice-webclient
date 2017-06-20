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
		var units = ['B', 'KB', 'MB', 'GB', 'TB'];

		Drive.prototype.$returnProperties = "*,groups";

		Drive.prototype.usage = 0;
		Drive.prototype.quota = 0;

		Drive.prototype.save = function() {
			var multiplier = units.indexOf(this.quotaUnit);
			this.quota = this.quotaText * Math.pow(1024, multiplier);
			delete this.quotaText;
			delete this.quotaUnit;
			return this.$parent.save.apply(this, arguments);
		};

		Drive.prototype.loadData = function(data, clearModified) {
			this.$parent.loadData.apply(this, arguments);
			var multiplier = Math.floor(Math.log(this.quota) / Math.log(1024));
			this.quotaText = Math.round(this.quota / Math.pow(1024, Math.floor(multiplier)));
			this.quotaUnit = units[multiplier];
		};

		Drive.prototype.getStoreRoute = function() {
			return 'drives';
		};

		Drive.prototype.percentage = function() {
			return Math.round((100/this.quota)*this.usage);
		};

		Drive.prototype.mount = function() { //bool
			return $http.post(ServerAPI.url('drives/'+this.id+'/mount',{mount:this.isMounted=='0'?false:true}));
		};

		return Drive;
	}]);
