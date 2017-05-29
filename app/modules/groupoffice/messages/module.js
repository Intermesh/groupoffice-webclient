'use strict';


// Declare app level module which depends on views, and components
GO.module('GO.Modules.GroupOffice.Messages', ['GO.Core']).run([
	'GO.Core.Services.Application',

	'GO.Modules.GroupOffice.Messages.Services.Composer',

	function (App, Composer) {

		App.currentUser.whenAuthenticated().then(function () {
			if (App.currentUser.getServerModule('GO\\Modules\\GroupOffice\\Messages\\Module')) {

				App.addLauncher('Messages', 'messages', 'messages', {icon: 'message'});

				var onNotificationClick = function (notification, $state) {
				
					$state.go('messages.thread', {threadId: notification.data.message.threadId, type: 'outbox'});
				};

				App.addNotificationTemplate(
								"GO\\Modules\\GroupOffice\\Messages\\Model\\Message", {
									"error": {template: "<go-notification-standard on-open='open(model)' on-dismiss='dismiss(model)' model='model'>{{'Error while sending message {data.message.subject}: {data.error}' | goT: model}}</go-notification-standard>", onClick: onNotificationClick}
								}

				);

				GO.hooks.overrideController('GO.Core.Controller.MailTo', ["ctrlLocals", function (ctrlLocals) {

//				console.log(ctrlLocals.$scope.compose);
						ctrlLocals.$scope.compose = function (config) {
							Composer.open({to: [{
										address: config.to,
										personal: config.displayName
									}]
							});

						};
					}]);
			}
		});
	}]).config(['$stateProvider', function ($stateProvider) {
		// Now set up the states
		$stateProvider.state('messages', {
			templateUrl: 'modules/groupoffice/messages/views/main.html',
			controller: 'GO.Modules.GroupOffice.Messages.Controller.Main',
			url: "/messages?type",
			reloadOnSearch: false, //needed for query params in main state
		}).state('messages-setup', {
			templateUrl: 'modules/groupoffice/messages/views/setup.html',
			url: "/messages/setup"
		}).state('messages.thread', {
			url: "/{threadId:[0-9,]*}",
			templateUrl: 'modules/groupoffice/messages/views/thread.html',
			controller: 'GO.Modules.GroupOffice.Messages.Controller.Thread'
		});

	}]);