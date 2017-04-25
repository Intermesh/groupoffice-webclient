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
//					$timeout(function() {						
//						$scope.model.reset('username');
//						$scope.model.reset('password');
//					}, 1000);
				});
				var origSave = $scope.save;
				
				$scope.save = function() {					
					$scope.model.name = $scope.model.adaptor.fromEmail;					
					return origSave();
				};

			
			}]);
