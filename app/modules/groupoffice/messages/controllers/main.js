'use strict';

GO.module('GO.Modules.GroupOffice.Messages').
				controller('GO.Modules.GroupOffice.Messages.Controller.Main', [
					'$scope',
					'GO.Modules.GroupOffice.Messages.Model.Thread',
					'GO.Modules.GroupOffice.Messages.Model.Message',
					'GO.Core.Services.Dialog',
					'$state',
					'GO.Modules.GroupOffice.Messages.Providers.AccountMapping',
					'$injector',
					'GO.Modules.GroupOffice.Messages.Services.AccountStore',
					'$http',
					'GO.Core.Services.ServerAPI',
					function ($scope, Thread, Message, Dialog, $state, mappings, $injector, accountStore, $http, ServerAPI) {

						$scope.thread = new Thread();
						
						$scope.store = $scope.thread.getStore({
							returnProperties: "id,subject,from[address,personal],excerpt,answered,seen,forwarded,messageCount,lastMessageSentAt,hasAttachments,photoBlobId"
						});
						
						
						//store for child ThreadController
						//define stuff in the parent controller if you can to prevent screen flicker because models are reinitialized on each page load.
						$scope.threadStore = (new Message()).getStore({
							limit: 5, 
							returnProperties: '*,from[address,personal],to[address,personal],cc[address,personal],attachments,thread[accountId]'});//new Store('email/accounts/'+$stateParams.accountId+'/threads/'+$stateParams.threadId, {limit: 5});				

//						var  firstAccount;
						
//						$scope.onFilterLoad = function (filterCollection) {
//			
//							
////							$scope.firstAccount = null;
//							
//							var accountOptions = filterCollection.findFilter('AccountFilter').options;
//							for (var i = 0, l = accountOptions.length; i < l; i++) {
//								
//								//AccountSync.sync(accountOptions[i].accountModel.id, accountOptions[i].accountModel.username, accountOptions[i]);
//								
//								if(accountOptions[i].selected) {									
//									var clientModelClass = $injector.get(mappings[accountOptions[i].accountModel.className]);
//									var account = new clientModelClass;									
//									account.loadData(accountOptions[i].accountModel);
//									
//									if(!firstAccount) {
//										firstAccount = account;	
//									}
//									
//									accounts[account.id] = account;
//								}
//							}
////							$scope.accounts = accounts;
//						};


						
						
						
						
						
						
						
						var afterCompose = function (openResult) {

							openResult.close.then(function (closeResult) {								
								if (closeResult) {
									if(!$state.is('messages.thread', {accountId: closeResult.thread.accountId, threadId: closeResult.threadId})) {
									
										$state.go('messages.thread', {accountId: closeResult.thread.accountId, threadId: closeResult.threadId});
									}else
									{
										$scope.store.reload();
										$scope.threadStore.reload();
									}
									
									//force a sync
									$http.get(ServerAPI.url('accounts/' + closeResult.thread.accountId + '/sync'));
								}
							});
						};
						
						$scope.reply = function(message, all) {
//							accountStore.findModelByAttribute('id', thread.accountId).getAccountModel().reply($scope.threadStore.items[0],all).then(afterCompose);
							message.reply(all).then(afterCompose);
						};
						
						$scope.forward = function(message) {
//							accountStore.findModelByAttribute('id', thread.accountId).getAccountModel().forward(threadMessage).then(afterCompose);
							message.forward().then(afterCompose);
						};
						
						$scope.compose = function(attributes, message) {
							accountStore.items[0].getAccountModel().compose(attributes, message).then(afterCompose);
						};
						
						$scope.selectThread = function(model) {
//							console.profile('thread');
							$state.go('messages.thread',{threadId: model.id});
						};

					}]);
