'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Smtp', ['GO.Core'])
	.run(['GO.Core.Services.Application',
		function (App) {

			App.addAccountType('GO\\Core\\Smtp\\Model\\Account', 'GO.Modules.GroupOffice.Smtp.Model.Account', 'send', {
				templateUrl: 'modules/groupoffice/smtp/views/account.html',
				controller: 'GO.Modules.GroupOffice.Smtp.Controller.Account'
			});

		}]);