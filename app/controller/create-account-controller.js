'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.CreateAccountController', [
	'$scope',
	'GO.Core.Services.Application',
	'GO.Core.Services.Dialog',
	'close',
	'$injector',
	'accountStore',
	function ($scope, App, Dialog, close, $injector, accountStore) {

		$scope.close = close;
		
		$scope.accountTypes = App.accountTypes;
		
		$scope.createAccount = function (accountType) {
			var model = $injector.get(accountType.clientModelName);
			accountType.createDialogConfig.editModel = new model;
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
				