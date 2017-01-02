'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.ICalendar')
		.controller('GO.Modules.GroupOffice.ICalendar.AccountController', ['$scope', 'GO.Core.Factories.Data.Model', 'accountId', 'close', function ($scope, Model, accountId, close) {
	

				$scope.account = new Model("icalendar/accounts");
				$scope.account.read(accountId);
				
				$scope.close = close;
				
				$scope.save = function () {
					return $scope.account.save()
							.then(function (result) {
								close($scope.account);
							});
				};
			}]);
