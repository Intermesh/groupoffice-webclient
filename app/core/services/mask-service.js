  'use strict';
/**
 * @ngdoc service
 * @name GO.Core.Mask
 * @description
 * Show a mask when loading.
 *
 * @example
 * Mask.watchPromise(								
 * $http.post(
 * 			Utils.url('email/accounts/' + $stateParams.accountId + '/messages/' + message.id + '/forwardAttachments')
 * 			).then(function (result) {
 * 
 * 			})
 * );				
 * }]);
 */
  angular.module('GO.Core')
					.factory('GO.Core.Services.Mask', ['$rootScope', '$timeout', 'GO.Core.Providers.Translate', '$mdToast', function($rootScope, $timeout, Translate, $mdToast) {
						var Mask = function(){
							
						};
		
						var pending = 0;
		
						Mask.prototype.watchPromise = function(promise, text, successAlert) {
							
							pending++;
							
							$rootScope.maskText = Translate.t(text) || Translate.t("Please wait")+"...";
							
							$timeout(function(){
								$rootScope.showMask = pending > 0;
							}, 500);
							
							promise.finally (function(){
								pending--;
								
								$rootScope.showMask = pending > 0;
							});
							
							
							if(successAlert) {
								promise.then(function() {
									if(successAlert) {
										$mdToast.show($mdToast.simple().position('top right').content(Translate.t(successAlert)));

//										Alerts.addAlert(Translate.t(successAlert), 'success');
									}
								});
								
//								}, function(){
//									if(failAlert) {
//										Alerts.addAlert(Translate.t(failAlert), 'warning');
//									}
//								});
							}
							
							return promise;
						};
						
						return new Mask();
					}]);		