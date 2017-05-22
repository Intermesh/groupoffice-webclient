'use strict';

angular.module('GO.Controllers').controller('GO.Controllers.CoreSettingsController', [
	'$scope',
	'GO.Core.Factories.Data.Resource',
	'$http',
	'GO.Core.Services.ServerAPI',
	'$mdToast',
	'GO.Core.Services.Dialog',
	'GO.Core.Services.Application',
	'GO.Core.Factories.Models.Account',
	function ($scope, Resource, $http, ServerAPI, $mdToast, Dialog, App, Account) {
		
		
		$scope.model = new Resource('settings', '*', []);
		$scope.model.read();
		
		$scope.$watch('model', function(){
			$scope.model.save();
		}, true);
		
		$scope.user = App.currentUser;		
		
		$scope.webclientModel = new Resource('webclient/settings', '*', []);
		$scope.webclientModel.read();

		
		$scope.sendTestMessage = function() {
			$http.post(ServerAPI.url('settings/testSmtp')).then(function(result) {
				$mdToast.showSimple("Message sent successfully");
			});
		};
		
		$scope.addSmtpAccount = function() {
			var model = new Account;
			model.read("0", {modelName: "GO\\Core\\Smtp\\Model\\Account"});
			
			return Dialog.show({
				editModel: model,
				templateUrl: 'modules/groupoffice/smtp/views/account.html',
				controller: 'GO.Modules.GroupOffice.Smtp.Controller.Account'
			}).then(function (dialog) {
				return dialog.close;
			});
		};
		
	}]);
				