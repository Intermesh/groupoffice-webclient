
'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goMask
 * @element ANY
 *
 * @description
 * Show a mask to make an element disabled.
 *
 * @param {expression} active Expression to make it show or not
 * @example 
 * <go-mask ng-show="showMask"></go-mask> 
 */


angular.module('GO.Modules.GroupOffice.Notifications').directive('goWatchButton', [
	'GO.Core.Services.ServerAPI',
	'GO.Core.Services.CurrentUser',
	'$http',
	function (ServerAPI, CurrentUser, $http) {
		return {			
			templateUrl: 'modules/groupoffice/notifications/directives/watch-button.html',
			restrict: 'E',
			scope: {
				recordId: '=',
				recordClassName: '@'
			},
			link: function(scope, element, attr) {
				
				
				var loadedId;
				scope.toggle = function() {
					
					var url = ServerAPI.url('notifications/watches/'+encodeURIComponent(scope.recordClassName)+'/'+scope.recordId+'/'+CurrentUser.id);
					if(scope.isWatched) {
						$http.delete(url).then(function(result) {							
							scope.isWatched = false;
						});
					}else
					{
						$http.post(url).then(function(result) {							
							scope.isWatched = true;
						});						
					}
				};
				
				scope.isWatched = true;
				scope.$watch('recordId', function(v, old) {
					
					var url = ServerAPI.url('notifications/watches/'+encodeURIComponent(scope.recordClassName)+'/'+scope.recordId+'/'+CurrentUser.id);
					
					if(v && v!=loadedId) {
						
						loadedId=v;
						
						$http.get(url).then(function(result) {	
							scope.isWatched = result.data.isWatched;
							
						});
					}
				});
				
			}
		};
	}]);

