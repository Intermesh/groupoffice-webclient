'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Imap', ['GO.Core', 'GO.Modules.GroupOffice.Messages']).run([
	'GO.Core.Services.Application',
	function (App) {

		App.currentUser.whenAuthenticated().then(function () {
			App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Imap\\Module').then(function (module) {

				App.addAccountType('GO\\Modules\\GroupOffice\\Imap\\Model\\Account', 'GO.Modules.GroupOffice.Imap.Model.Account', 'email', {
					templateUrl: 'modules/groupoffice/imap/views/account.html',
					controller: 'GO.Modules.GroupOffice.Imap.Controller.Account',
					inputs: {
						autodetect: null //Create account dialog passes an autodetect model. We must declare it here too for the Dep inject.
					}
				}, {
					templateUrl: 'modules/groupoffice/imap/views/auto-detect.html',
					controller: 'GO.Modules.GroupOffice.Imap.Controller.AutoDetect'
				});
			});
		});
	}]).config([
	'GO.Modules.GroupOffice.Messages.Providers.AccountMappingProvider',
	function (AccountMappingProvider) {

		AccountMappingProvider.add('GO\\Modules\\GroupOffice\\Imap\\Model\\Account', 'GO.Modules.GroupOffice.Imap.Model.Account');

	}]);