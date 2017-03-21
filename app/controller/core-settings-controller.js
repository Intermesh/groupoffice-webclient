'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.CoreSettingsController', [
	'$scope',
	'GO.Core.Factories.Data.Resource',
	'$http',
	'GO.Core.Services.ServerAPI',
	'$mdToast',
	'GO.Core.Services.Dialog',
	'GO.Core.Services.Application',
	function ($scope, Resource, $http, ServerAPI, $mdToast, Dialog, App) {
		
		var smtpAccount = new Resource('smtp/accounts');

		$scope.smtpAccountStore = smtpAccount.getStore();
		$scope.smtpAccountStore.load();
		
		$scope.model = new Resource('settings', '*', []);
		$scope.model.read();
		
		$scope.$watch('model', function(){
			$scope.model.save();
		}, true);
		
		
//		App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Webclient\\Module').then(function (module) {		
			$scope.webclientModel = new Resource('webclient/settings', '*', []);
			$scope.webclientModel.read();
//		});
		
		
		$scope.sendTestMessage = function() {
			$http.post(ServerAPI.url('settings/testSmtp')).then(function(result) {
				$mdToast.showSimple("Message sent successfully");
			});
		};
		
		$scope.addSmtpAccount = function() {
			var model = angular.copy(smtpAccount);
			
			Dialog.show({
				editModel: model,
				templateUrl: 'modules/groupoffice/smtp/views/account.html',
				controller: 'GO.Modules.GroupOffice.Smtp.Controller.Account'
			}).then(function (dialog) {
				dialog.close.then(function (account) {
					if (account) {						
						$scope.model.smtpAccount = account;
					}
				});
			});
		};
		
	}]);
				