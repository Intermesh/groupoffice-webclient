'use strict';

// register the interceptor as a service
angular.module('GO.Core').factory('GO.Core.Factories.HttpStatusInterceptor', [
	'$injector',
	'$q',
	'$rootScope',
	'$timeout',
	'GO.Core.Services.ServerAPI',
	function ($injector, $q, $rootScope, $timeout, ServerAPI) {
		function debugLog(response) {
			var contentType = response.headers('Content-Type');
			if (contentType && contentType.indexOf('application/json') > -1 && response.data) {

				if (response.data.debug) {
					console.groupCollapsed("### DEBUG: " + response.config.method + ": " + response.config.url + " ###");
					for (var i = 0, l = response.data.debug.length; i < l; i++) {
						console.log(response.data.debug[i]);
					}
					console.groupEnd();
				}

				if (response.data.errors) {
					for (var i = 0, l = response.data.errors.length; i < l; i++) {
						console.error(response.data.errors[i]);
					}
				}

				if (response.data.exception) {
					for (var i = 0, l = response.data.exception.length; i < l; i++) {
						console.error(response.data.exception[i]);
					}
				}
			}
		}
		;
		
		var busy = 0;
		var lastTimeout;

		return {
			
			
			request : function(config) {
				
				angular.extend(config.headers, ServerAPI.headers);
				
				busy++;
				
				if(lastTimeout) {
					$timeout.cancel(lastTimeout);
				}
				lastTimeout = $timeout(function(){

					if(busy) {
						$rootScope.showMask = true;
					}
				}, 1000);
				
				return config;
			},
			response: function (response) {
								
				busy--;				
				if(busy === 0) {
					$rootScope.showMask = false;
				}

				return response;
			},
			responseError: function (response) {
				
				busy--;				
				if(busy === 0) {
					$rootScope.showMask = false;
				}

				debugLog(response);

				var status = response.status;

				if (status === 401) {
					var $state = $injector.get('$state');
					$state.go('login');
				} else
				{
					var msg = 'Oops, a server error occurred: ' + status;
					if (response.data && response.data.errors) {
						msg = response.data.errors.join("<br />");
					}

					var $mdToast = $injector.get('$mdToast');
					
					$mdToast.show($mdToast.simple().content(msg));


				}
				// otherwise
				return $q.reject(response);
			}
		};
	}])
	.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('GO.Core.Factories.HttpStatusInterceptor');
		}]);


