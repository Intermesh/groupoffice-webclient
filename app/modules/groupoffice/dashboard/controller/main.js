'use strict';

GO.module('GO.Modules.GroupOffice.Dashboard').
				controller('GO.Modules.GroupOffice.Dashboard.Controller.Main', [
					'$scope',
					'GO.Core.Services.Application',
					function ($scope, App) {

						$scope.user = App.currentUser;
						$scope.dashboardWidgets = App.dashboardWidgets;

					}]);
