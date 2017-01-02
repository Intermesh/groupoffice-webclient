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
		
		console.log(App);

		$scope.accountTypes = App.accountTypes;
		
		$scope.createAccount = function (accountType) {
			var model = $injector.get(accountType.clientModelName);
			accountType.createDialogConfig.editModel = new model;
			close();

			accountType.createDialogConfig.inputs = accountType.createDialogConfig.inputs || {};
			accountType.createDialogConfig.inputs.accountStore = accountStore;

			Dialog.show(accountType.createDialogConfig).then(function (dialog) {
				dialog.close.then(function () {
					accountStore.load();
				});
			});
		};

	}]);
				