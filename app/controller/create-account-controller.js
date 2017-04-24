'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.CreateAccountController', [
	'$scope',
	'GO.Core.Services.Application',
	'GO.Core.Services.Dialog',
	'close',
	'GO.Core.Factories.Models.Account',
	'accountStore',
	function ($scope, App, Dialog, close, Account, accountStore) {

		$scope.close = close;
		
		$scope.accountTypes = App.accountTypes;
		
		$scope.createAccount = function (accountType) {

			accountType.createDialogConfig.editModel = new Account;
			
			accountType.createDialogConfig.editModel.read("0", {modelName: accountType.serverModelName});
			close();

			accountType.createDialogConfig.inputs = accountType.createDialogConfig.inputs || {};
			accountType.createDialogConfig.inputs.callback = function(){
				accountStore.load();
			};

			Dialog.show(accountType.createDialogConfig).then(function (dialog) {
				dialog.close.then(function () {
					accountStore.load();
				});
			});
		};

	}]);
				