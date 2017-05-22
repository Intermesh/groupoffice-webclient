'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Services.ServerModules
 *
 * @description
 * Get's modules available for the current user from the server
 *
 */

angular.module('GO.Core').service('GO.Core.Services.ClientModules', [
	'GO.Core.Providers.ClientModules',
	'$log',
	'GO.Core.Services.CurrentUser',
	function (clientModulesProvider, $log, CurrentUser) {

		var ClientModules = function () {

		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Services.ClientModules#getModules
		 * @methodOf GO.Core.Services.ClientModules
		 * @description
		 * Get all available client modules. It checks the server module dependencies.
		 *
		 * @returns {Promise} Returns a Promise that is resolved with the client modules.
		 */
		ClientModules.prototype.getModules = function () {

			var allowedClientModules = {}, clientModule;

			clientModules:
			for (var id in clientModulesProvider) {
				clientModule = clientModulesProvider[id];
				for (var i = 0, l = clientModule.serverModuleDependencies.length; i < l; i++) {
					if (!CurrentUser.hasServerModule(clientModule.serverModuleDependencies[i]))
					{
						$log.debug("Client module " + id + " disabled because server module " + clientModule.serverModuleDependencies[i] + " not available.");
						continue clientModules;
					}
				}
				allowedClientModules[id] = clientModule;
			}

			return allowedClientModules;
		};

		/*
		 * Reload the servermodules, this triggers the reloading of these client modules
		 */
		ClientModules.prototype.reload = function () {

			console.log('Todo reload current user?');

		};


	}]);
