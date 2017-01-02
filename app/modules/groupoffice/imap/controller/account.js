'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Imap')
		.controller('GO.Modules.GroupOffice.Imap.Controller.Account', [
			'$scope', 
			'close', 
			'autodetect',
			'read',
			function ($scope, close, autodetect, read) {
				
				if(autodetect) {
					read.then(function() {

						var attr = autodetect.getAttributes();

						delete attr.authenticated;
						delete attr.email;
						delete attr.allowInsecure;

						delete attr.smtpAccount.authenticated;
						delete attr.smtpAccount.email;
						delete attr.smtpAccount.allowInsecure;

						$scope.model.setAttributes(attr);
					});
				}
	
				$scope.$watch('model.encryption', function(value) {
					if(value == 'ssl') {
						$scope.model.port = 993;
					}else
					{
						$scope.model.port = 143;
					}
				});
				
					
				$scope.deleteAccount = function() {
					
					$scope.model.delete().then(function() {
						close();
					});
				};
				
				$scope.onImagePaste =function (dataURL, editor) {
				
					editor.composer.commands.exec("insertImage", {src: dataURL, alt: "Pasted image"});
					
				};
					
			}]);
