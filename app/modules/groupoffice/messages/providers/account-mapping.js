angular.module('GO.Modules.GroupOffice.Messages').provider('GO.Modules.GroupOffice.Messages.Providers.AccountMapping', [function AccountMapping() {

		var mappings = {};

		/**
		 * @ngdoc method
		 * @name GO.Core.LauncherProvider#add
		 * @methodOf GO.Core.LauncherProvider
		 * @description
		 *
		 * Add a launcher
		 *
		 * @param {string} id The ID of the module. For example used to generate the launcher css class go-launcher-{{id}}				 
		 * @param {string} title The title of the launcher in English
		 * @param {array} Module dependencies. Eg. ['GO\Modules\GroupOffice\Contacts\ContactsModule']
		 * @param {boolean} adminsOnly Set to true if this module is for admins only.
		 * @param {string} state UI Router State that this launcher should go to. If you leave this empty it will use the ID as the state.
		 */
		this.add = function (serverModel, clientModel) {
			mappings[serverModel] = clientModel;
		};


		this.$get = [function () {
				return mappings;
			}];
	}]);
