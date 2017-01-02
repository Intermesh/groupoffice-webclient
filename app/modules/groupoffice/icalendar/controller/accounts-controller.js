'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.ICalendar').
				controller('GO.Modules.GroupOffice.ICalendar.AccountsController', ['$scope', 'GO.Core.Factories.Data.Model', 'GO.Core.Services.Dialog', '$state', function ($scope, Model, Modal, $state) {

					var account = new Model("icalendar/accounts");
					
					$scope.accountStore = account.getStore({
						returnProperties: '*'
					});					
					$scope.accountStore.load();			
					
					
//					$scope.delete = function(account){							
//							account.delete().then(function(result){
//								var index = $scope.accountStore.findIndexByAttribute('id', account.id);
//								$scope.accountStore.remove(index);
//							});
//						};
					
					
					$scope.editAccount = function(accountId) {
						Modal.show({
								templateUrl: 'modules/groupoffice/icalendar/views/settings/account.html',
								controller: 'GO.Modules.GroupOffice.ICalendar.AccountController',
								inputs: {
									accountId: accountId
								}
							}).then(function (data) {
								data.close.then(function (account) {
									if(account) {
//										$scope.accountStore.load();
										$state.reload(); //reload state because of combined page with accounts. Create account is called from a different controller instance.
									}
								});

							});
					};
					

				}]);