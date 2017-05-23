'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Dav', ['GO.Core']).run([
	'GO.Core.Services.Application',
	function (App) {



		App.currentUser.whenAuthenticated().then(function () {
			if (App.currentUser.getServerModule('GO\\Modules\\GroupOffice\\Dav\\Module')) {
				App.addAccountType('GO\\Modules\\GroupOffice\\Dav\\Model\\Account', 'Nietmeernodig', 'contacts', {
					templateUrl: 'modules/groupoffice/dav/views/account-edit.html',
					controller: 'GO.Modules.GroupOffice.Dav.Controller.AccountEdit'
				});
			}
			;
		});

	}]);