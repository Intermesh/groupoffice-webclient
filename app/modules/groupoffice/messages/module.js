'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Messages', ['GO.Core']).run([
	'GO.Core.Services.Application',
	
	'GO.Modules.GroupOffice.Messages.Services.AccountStore',
	function (App, AccountStore) {

		App.currentUser.whenAuthenticated().then(function () {
			App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Messages\\Module').then(function (module) {
				App.addLauncher('Messages', 'messages', 'messages', {icon: 'message'});

				
				GO.hooks.overrideController('GO.Core.Controller.MailTo', ["ctrlLocals", function(ctrlLocals){
				
//				console.log(ctrlLocals.$scope.compose);
					ctrlLocals.$scope.compose = function(config) {
						AccountStore.load().then(function(){
							AccountStore.items[0].getAccountModel().compose({to:[{
									address: config.to,
									personal: config.displayName
								}]
							});
						});
					};
				}]);
				
//				GO.hooks.register('mailto', ['element', function (element) {
//						
//						
//						$rootScope.compose = function(config) {
//							alert(config.to);
//						};
//						
//							var a = element.find('a');
//							
//							a.attr('href', '');
//							
//							a.attr('ng-click', 'compose({to: this.innerHTML})');		
//				
//					}]);

			});
		});
	}]).config(['$stateProvider', function ($stateProvider) {
		// Now set up the states
		$stateProvider.state('messages', {
			templateUrl: 'modules/groupoffice/messages/views/main.html',
			controller: 'GO.Modules.GroupOffice.Messages.Controller.Main',
			url: "/messages"
		}).state('messages-setup', {
			templateUrl: 'modules/groupoffice/messages/views/setup.html',
			url: "/messages/setup"
		}).state('messages.thread', {
			url: "/{threadId:[0-9,]*}",
			templateUrl: 'modules/groupoffice/messages/views/thread.html',
			controller: 'GO.Modules.GroupOffice.Messages.Controller.Thread'
		});

	}]);