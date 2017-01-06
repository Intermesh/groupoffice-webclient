'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Imap').controller('GO.Modules.GroupOffice.Imap.Controller.AutoDetect', [
	'$scope',
	'GO.Modules.GroupOffice.Imap.Model.AutoDetect',
	'GO.Core.Services.Mask',
	'GO.Core.Services.Dialog',
	'close',
	'callback',
	'GO.Modules.GroupOffice.Imap.Model.Account',
	function ($scope, AutoDetect, Mask, Dialog, close, callback,Account) {


		$scope.autodetect = new AutoDetect();
		$scope.extra = {fromName: ''};

		$scope.autodetect.read();

		$scope.close = close;

		$scope.save = function () {
			$scope.extra.password = $scope.autodetect.password;
			return Mask.watchPromise($scope.autodetect.save().then(function (result) {

				if (!$scope.autodetect.authenticated) {
					$scope.extra.password = '';
				}

//								$scope.autodetect.smtpAccount.fromName = $scope.autodetect.fromName;
//								delete $scope.autodetect.fromName;
				$scope.autodetect.password = $scope.extra.password;
				angular.extend($scope.autodetect.smtpAccount, $scope.extra);

				$scope.autodetect.smtpAccount.fromEmail = $scope.autodetect.email;

				close();
				
				Dialog.show({
					editModel: new Account(),
					templateUrl: 'modules/groupoffice/imap/views/account.html',
					controller: 'GO.Modules.GroupOffice.Imap.Controller.Account',
					inputs: {						
						autodetect: $scope.autodetect
					}
				}).then(function (data) {
					data.close.then(function (account) {						
						
						if(callback) {
							callback.call(this, account);
						}
						
					});
				});

			}), "Detecting mail settings...");
		};
	}]);
