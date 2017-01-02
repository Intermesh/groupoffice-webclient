'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Services.ServerModules
 *
 * @description
 * Get's modules available for the current user from the server
 *
 */

angular.module('GO.Core').service('GO.Core.Services.ServerModules', [
	'GO.Core.Factories.Models.Module',
	"$q",
	function (Module, $q) {

		var ServerModules = function () {
			this.store = (new Module()).getStore({
				limit: 0
			});

		};

		/**
		* @ngdoc method
		* @name GO.Core.Services.ServerModules#fetchModule
		* @methodOf GO.Core.Services.ServerModules
		* @description
		* Fetch a server module from the server
		*
		* @param {string} moduleName Name of the module. eg. 'GO\\Modules\\GroupOffice\\Contacts\\Module'
		* @returns {Promise} Returns a Promise that is resolved with the module or false on failure.
		*/
		ServerModules.prototype.fetchModule = function (moduleName) {
			return this.fetchModules().then(function (modules) {
				for (var i = 0, l = modules.length; i < l; i++) {

					if (modules[i].name === moduleName) {
						return modules[i];
					}
				}				
				
				return $q.reject('Module "'+moduleName+'" not found');
			});
		};

		/**
		* @ngdoc method
		* @name GO.Core.Services.ServerModules#fetchModules
		* @methodOf GO.Core.Services.ServerModules
		* @description
		* Fetch all server modules from the server available for the current user.
		*
		* @returns {Promise} Returns a Promise that is resolved with the modules
		*/
		ServerModules.prototype.fetchModules = function () {
			if (this.promise) {
				return this.promise;
			} 
			this.promise = this.store.load().then(function () {
				this.modules = this.store.items;				
				return this.modules;
			}.bind(this))							
			.catch(function (data) {
				this.promise = false;
			}.bind(this));
			
			return this.promise;
		};
		
		/**
		 * Set the promise to null so the next fetchModules action will reload.
		 * 
		 * @returns {undefined}
		 */
		ServerModules.prototype.reload = function(){
			this.promise = null;
		};

		return new ServerModules;

	}]);