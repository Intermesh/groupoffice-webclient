'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Messages', ['GO.Core']).run([
	'GO.Core.Services.Application',
	function (App) {

		App.currentUser.whenAuthenticated().then(function () {
			App.serverModules.fetchModule('GO\\Modules\\GroupOffice\\Messages\\Module').then(function (module) {
				App.addLauncher('Messages', 'messages', 'messages',{icon: 'message'});
				
				App.addNotificationTemplate(
						"GO\\Modules\\GroupOffice\\Imap\\Model\\Account", {
							unseen: "<h3>You have {{data.unseen}} unseen threads in {{data.name}}</h3>"
						},
						function (event, $state) {
							$state.go('messages');
						}
			
			);
			});		
		});
	}]).config(['$stateProvider', function ($stateProvider) {
		// Now set up the states
		$stateProvider.state('messages', {
			templateUrl: 'modules/groupoffice/messages/views/main.html',
			controller: 'GO.Modules.GroupOffice.Messages.Controller.Main',
			url: "/messages"
		}).state('messages.thread', {
			url: "/{threadId:[0-9,]*}",
			templateUrl: 'modules/groupoffice/messages/views/thread.html',
			controller: 'GO.Modules.GroupOffice.Messages.Controller.Thread'
		});

	}]);