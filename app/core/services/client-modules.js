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
	'GO.Core.Services.ServerModules',
	'GO.Core.Providers.ClientModules',
	'$log',
	'GO.Core.Services.CurrentUser',
	function (ServerModules, clientModulesProvider, $log, CurrentUser) {

		var ClientModules = function () {

		};
		
		/**
		* @ngdoc method
		* @name GO.Core.Services.ClientModules#fetchModules
		* @methodOf GO.Core.Services.ClientModules
		* @description
		* Get all available client modules. It checks the server module dependencies.
		*
		* @returns {Promise} Returns a Promise that is resolved with the client modules.
		*/
		ClientModules.prototype.fetchModules = function() {
			if(!this.modulesPromise){
					this.modulesPromise = ServerModules.fetchModules().then(function (serverModules) {

					var serverModuleNames = [], allowedClientModules = {}, clientModule;

					for (var i = 0, l = serverModules.length; i < l; i++) {
						serverModuleNames.push(serverModules[i].name);
					}

					clientModules:
					for(var id in clientModulesProvider) {
						clientModule = clientModulesProvider[id];
						for (var i = 0, l = clientModule.serverModuleDependencies.length; i < l; i++) {
							if (serverModuleNames.indexOf(clientModule.serverModuleDependencies[i]) === -1)
							{
								$log.debug("Client module " + id + " disabled because server module " + clientModule.serverModuleDependencies[i] + " not available.");
								continue clientModules;
							}
						}
						allowedClientModules[id]=clientModule;
					}

					return allowedClientModules;
				});
			}
			
			return this.modulesPromise;
		};
		
		/**
		* @ngdoc method
		* @name GO.Core.Services.ClientModules#fetchLaunchers
		* @methodOf GO.Core.Services.ClientModules
		* @description
		* Get all available launchers. It checks the server module dependencies.
		*
		* @returns {Promise} Returns a Promise that is resolved with the launchers
		*/
		ClientModules.prototype.fetchSettingsOptions = function () {
			
			if(!this.settingsPromise){
				this.settingsPromise =this.fetchModules().then(function (clientModules) {

					var settingsOption,	allowedSettingsOptions = [];

					for(var id in clientModules) {

						for(var i=0,l=clientModules[id].settingsOptions.length;i<l;i++) {
							settingsOption = clientModules[id].settingsOptions[i];

							if (settingsOption.adminsOnly && !CurrentUser.isAdmin) {
								$log.debug("launcher " + settingsOption.title + " disabled because it's for admins only");
							}else
							{
								allowedSettingsOptions.push(settingsOption);
							}
						}
					}

					return allowedSettingsOptions;

				}.bind(this));
			}
			return this.settingsPromise;
		};

		/**
		* @ngdoc method
		* @name GO.Core.Services.ClientModules#fetchLaunchers
		* @methodOf GO.Core.Services.ClientModules
		* @description
		* Get all available launchers. It checks the server module dependencies.
		*
		* @returns {Promise} Returns a Promise that is resolved with the launchers
		*/
		ClientModules.prototype.fetchLaunchers = function () {

			
			if(!this.launchersPromise) {
				this.launchersPromise = this.fetchModules().then(function (clientModules) {

					var launcher,	allowedLaunchers = [];

					for(var id in clientModules) {

						for(var i=0,l=clientModules[id].launchers.length;i<l;i++) {
							launcher = clientModules[id].launchers[i];

							if (launcher.adminsOnly && !CurrentUser.isAdmin) {
								$log.debug("launcher " + launcher.title + " disabled because it's for admins only");
							}else
							{
								allowedLaunchers.push(launcher);
							}
						}
					}
	//				this.allowedLaunchers = allowedLaunchers;
					return allowedLaunchers;

				}.bind(this));
			}
			
			return this.launchersPromise;
		};
		
		/*
		 * Reload the servermodules, this triggers the reloading of these client modules
		 */
		ClientModules.prototype.reload = function() {
			ServerModules.reload();
			delete this.launchersPromise;
			delete this.modulesPromise;
			delete this.settingsPromise;
		};
		
		
		ClientModules.prototype.fetchAccountTypes = function() {
			return this.fetchModules().then(function(modules) {
				var accountTypes = {};
				
				
				for(var moduleName in modules){					
					accountTypes = angular.extend(accountTypes, modules[moduleName].accountTypes);
				} 
				
				return accountTypes;
			});
		};
		
		/**
		* @ngdoc method
		* @name GO.Core.Services.ClientModules#fetchLauncherByState
		* @methodOf GO.Core.Services.ClientModules
		* @description
		* Get a launcher by a given state. It goes up the state path until it finds
		* a launcher.
		*
		* @param {string} state eg. contacts.contact
		* @returns {Promise} Returns a Promise that is resolved with the launcher
		*/
		ClientModules.prototype.fetchLauncherByState = function (state) {
			
			return this.fetchLaunchers().then(function (launchers) {

				while (state) {
					for (var i = 0, l = launchers.length; i < l; i++) {
						if (launchers[i].state == state) {
							return launchers[i];
						}
					}

					var lastDot = state.lastIndexOf('.');
					if (!lastDot) {
						state = false;
					} else
					{
						state = state.substring(0, lastDot);
					}
				}
				
				return false;
			});
		};
		

		return new ClientModules();


	}]);
