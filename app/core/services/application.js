'use strict';

angular.module('GO.Core').service('GO.Core.Services.Application', [
	'GO.Core.Services.CurrentUser',
	function(CurrentUser){
		

		

		function App() {
			this.currentUser = CurrentUser;
			
			this.launchers = [];
			this.settingsOptions = [];
			this.adminSettingsOptions = [];
			this.accountTypes = {};
			
			this.dashboardWidgets = [];
			
			this.notificationTemplates = [];
			
			//Add core settings
			this.addSettingsOption('settings.core', 'General', 'settings', true);
		}
		
		App.prototype.addDashboardWidget = function(name, view){
			this.dashboardWidgets.push({name: name, view: view});
		};
		
		/**
		 * 
		 * @param {string} ServerModelName
		 * @param {object} config template or templateUrl and onClick
		 * @returns {undefined}
		 */
		App.prototype.addNotificationTemplate = function (ServerModelName, config) {
			if(!this.notificationTemplates[ServerModelName]) {
				this.notificationTemplates[ServerModelName] = {};
			}
			angular.extend(this.notificationTemplates[ServerModelName], config);
		};
	
		
		/**
		 * @ngdoc method
		 * @name GO.Core.LauncherProvider#add
		 * @methodOf GO.Core.LauncherProvider
		 * @description
		 *
		 * Add a launcher
		 *
		 
		 * @param {string} title The title of the launcher in English
		 * @param {array} Module dependencies. Eg. ['GO\Modules\GroupOffice\Contacts\ContactsModule']
		 * @param {boolean} adminsOnly Set to true if this module is for admins only.
		 * @param {string} state UI Router State that this launcher should go to. If you leave this empty it will use the ID as the state.
		 * @param {string} id The ID of the launcher. Defaults to the ID of the module. For example used to generate the launcher css class go-launcher-{{id}}				 
		 */
		App.prototype.addLauncher = function (title, state, id, options) {

			if (!state) {
				state = this.id;
			}
			
			if(!id) {
				id = state;
			}

			var launcher = {
				id: id,
				state: state,
				title: title
			};
			if(options && options.icon) {
				launcher.icon = options.icon;
			}

			this.launchers.push(launcher);	
			this._sortLaunchers();
		};
		
		
		App.prototype._sortLaunchers = function() {
			this.launchers.sort(function(a, b) {
								var nameA = a.title.toUpperCase(); // ignore upper and lowercase
								var nameB = b.title.toUpperCase(); // ignore upper and lowercase
								if (nameA < nameB) {
									return -1;
								}
								if (nameA > nameB) {
									return 1;
								}

								// names must be equal
								return 0;
						});
		};
		
		
		App.prototype.addSettingsOption = function(state, title, iconCls, adminsOnly, priority) {
			if(adminsOnly) {
				this.adminSettingsOptions.push({
					state: state,
					title: title,
					iconCls: iconCls
				});
			}else
			{
				this.settingsOptions.push({
					state: state,
					title: title,
					iconCls: iconCls
				});
			}
		};
		
		/**
		 * 
		 * @param {type} serverModelName The server model for the account eg. 'GO\\Modules\\GroupOffice\\Imap\\Model\\Account' //Used to identify the account from the server
		 * @param {type} clientModelName The client tmodel name eg. 'GO.Modules.GroupOffice.Imap.Model.Account' Used to load the account data from the server
		 * @param {type} iconCls The material icons icon name
		 * @param {type} editDialogConfig
		 * @param {type} createDialogConfig Optional, if different from editDialogConfig
		 * @returns {undefined}
		 */
		App.prototype.addAccountType = function(serverModelName, clientModelName, iconCls, editDialogConfig, createDialogConfig) {			
			this.accountTypes[serverModelName] = {
				editDialogConfig: editDialogConfig,
				createDialogConfig: createDialogConfig || angular.copy(editDialogConfig),
				iconCls: iconCls,
				clientModelName: clientModelName,
				serverModelName: serverModelName
			};
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
		App.prototype.fetchLauncherByState = function (state) {
			
				while (state) {
					for (var i = 0, l = this.launchers.length; i < l; i++) {
						if (this.launchers[i].state == state) {
							return this.launchers[i];
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
		
		};
		
		return new App();
}]);
