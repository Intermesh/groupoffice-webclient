'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.AccountsController', [
	'$scope',
	'GO.Core.Services.Dialog',
	'$state',
	'GO.Core.Factories.Models.Account',
	'GO.Core.Services.Application',
	function ($scope, Dialog, $state, Account, App) {

		$scope.accountTypes = App.accountTypes;			
		
		$scope.store = new Account().getStore({
			q: [
				["requirePermissionType", "manage"]
			]
		});
		
		$scope.store.load();
		
		$scope.editAccount = function(coreAccount) {			
			var accountType = $scope.accountTypes[coreAccount.modelName];
			accountType.editDialogConfig.editModel = new Account;
			
			accountType.editDialogConfig.editModel.read(coreAccount.id).then(function(){
				Dialog.show(accountType.editDialogConfig).then(function(dialog) {
					dialog.close.then(function() {
						$scope.store.load();
					});									
				});
			});

		};

		$scope.createAccount = function () {
			Dialog.show({
				templateUrl: 'views/settings/create-account.html',
				controller: 'GO.Controllers.CreateAccountController',
				inputs: {
					accountStore: $scope.store
				}
			}).then(function(dialog) {
				dialog.close.then(function(record) {
//					if(record) {
//						AccountSync.init();
//					}
				});
			});
		};

	}]);
				