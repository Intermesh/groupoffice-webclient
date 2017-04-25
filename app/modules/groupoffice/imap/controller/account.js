'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Imap')
				.controller('GO.Modules.GroupOffice.Imap.Controller.Account', [
					'$scope',
					'close',
					'autodetect',
					'read',
					'GO.Core.Services.Dialog',
					'GO.Core.Factories.Models.Account',
					function ($scope, close, autodetect, read, Dialog, Account) {

						if (autodetect) {
							read.then(function () {

								var attr = autodetect.getAttributes();

								delete attr.authenticated;
								delete attr.email;
								delete attr.allowInsecure;
								delete attr.smtpAccount;

//						delete attr.smtpAccount.authenticated;
//						delete attr.smtpAccount.email;
//						delete attr.smtpAccount.allowInsecure;


								angular.extend($scope.model.adaptor, attr);
							});
						}

						$scope.$watch('model.adaptor.encryption', function (value) {
							if (value == 'ssl') {
								$scope.model.adaptor.port = 993;
							} else
							{
								$scope.model.adaptor.port = 143;
							}
						});



						var origSave = $scope.save;

						$scope.save = function () {
							$scope.model.name = $scope.model.adaptor.username;
							return origSave();
						};

						$scope.onImagePaste = function (dataURL, editor) {

							editor.composer.commands.exec("insertImage", {src: dataURL, alt: "Pasted image"});

						};
						
						
						$scope.addSmtpAccount = function() {
							var model = new Account;
							model.read("0", {modelName: "GO\\Core\\Smtp\\Model\\Account"}).then(function() {
								model.adaptor.fromEmail = $scope.model.adaptor.email;
								model.adaptor.username = $scope.model.adaptor.username;
								model.adaptor.password = $scope.model.adaptor.password;
								model.adaptor.hostname = $scope.model.adaptor.hostname;
							});
							
							return Dialog.show({
								editModel: model,
								templateUrl: 'modules/groupoffice/smtp/views/account.html',
								controller: 'GO.Modules.GroupOffice.Smtp.Controller.Account'
							}).then(function (dialog) {
								return dialog.close;
							});
						};

					}]);
