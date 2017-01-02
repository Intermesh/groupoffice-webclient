'use strict';

GO.module('GO.Modules.GroupOffice.Dashboard', []).run([
	'GO.Core.Services.Application',
	function (App) {
		App.addLauncher('Dashboard', 'dashboard', false, {icon:'dashboard'});

	}]).config(['$stateProvider', function ($stateProvider) {
		$stateProvider
						.state('dashboard', {
							url: "/dashboard",
							templateUrl: 'modules/groupoffice/dashboard/views/main.html',
							controller: 'GO.Modules.GroupOffice.Dashboard.Controller.Main'
						});
	}]);