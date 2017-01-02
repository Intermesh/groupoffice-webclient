'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Smtp')
		.controller('GO.Modules.GroupOffice.Smtp.Controller.Account', [
			'$scope', 
			'$timeout',
			'read',
			'close',
			function ($scope, $timeout, read, close) {				
				
				read.then(function(){					
					//reset password to prevent auto complete in browser
					$timeout(function() {						
						$scope.model.reset('username');
						$scope.model.reset('password');
					}, 1000);
				});
				
				$scope.deleteAccount = function() {
					
					$scope.model.delete().then(function() {
						close();
					});
				};
			
			}]);
