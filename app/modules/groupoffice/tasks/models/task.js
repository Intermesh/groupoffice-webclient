'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Tasks').factory('GO.Modules.GroupOffice.Tasks.Model.Task', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.Application',
	function (Model, App) {
		var Task = GO.extend(Model, function () {
			
			this.$parent.constructor.call(this, arguments);			
		});
		
		Task.prototype.$returnProperties = "*,tags,assignee";
		
		Task.prototype.getStoreRoute = function () {
			return 'tasks';
		};
		
		Task.prototype.setCompleted = function (completed) {
			
			if(completed) {
				this.completedAt = new Date();
			}else
			{
				this.completedAt = null;
			}
			
			return this.save();
		};
		
		return Task;
	}]);