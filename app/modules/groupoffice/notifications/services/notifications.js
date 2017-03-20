
angular.module('GO.Modules.GroupOffice.Notifications').service('GO.Modules.GroupOffice.Notifications.Services.Notifications', [
	'$mdSidenav',
	'GO.Core.Services.Application',
	'$state',
	'$http',
	'GO.Core.Services.ServerAPI',
	'GO.Core.Services.CurrentUser',
	'GO.Modules.GroupOffice.Notifications.Model.Notification',
	function ($mdSidenav, App, $state, $http, ServerAPI, CurrentUser, Notification) {

		var Notifications = function () {
			this.unseenCount = 0;
			
			this.clientNotifications = [];
			
			this.store = (new Notification()).getStore({
				returnProperties: "*,creator[username],about"
			});
		};
		
		Notifications.prototype.setServerUnseenCount = function(count) {
			this.unseenCount = count + this.clientNotifications.length;
		};


		Notifications.prototype.showPanel = function () {	
			
			$mdSidenav('right').toggle(true);
			
			if(this.unseenCount !== this.store.items.length) {
				this.store.load().then(function() {
					this.store.loadData(this.clientNotifications, true);
				}.bind(this));
			}
		};

		Notifications.prototype.closePanel = function () {
			$mdSidenav('right').toggle(false);
		};

		Notifications.prototype.onNotificationClick = function (model) {
			if (!App.notificationTemplates[model.about.name] || !App.notificationTemplates[model.about.name][model.type] || !App.notificationTemplates[model.about.name][model.type].onClick) {
				return;
			}
			App.notificationTemplates[model.about.name][model.type].onClick.call(this, model, $state);
			
			this.closePanel();
		};


		Notifications.prototype.dismiss = function (model) {
			$http.post(ServerAPI.url('notifications/dismiss/' + CurrentUser.id + '/' + model.id));

			var index = this.store.findIndexes({id: model.id}, true);
			this.store.remove(index);

			this.closePanel();

		};

		Notifications.prototype.dismissAll = function () {
			$http.post(ServerAPI.url('notifications/dismiss/' + CurrentUser.id));

			this.closePanel();

		};
		
		/**
		 * Add a notification
		 * 
		 * {
		 *	templateUrl : 'modules/example/views/notification.html',
		 *	template: '<div>{{text}}</div>',
		 *	locals: {
		 *		test: 'Example'
		 *	},
		 *	controller: 'GO.Example.Controller.Example'
		 * }
		 * 
		 * Example:
		 * 
		 * Notifications.add({
				template: '<div>{{title}}</div>',
				locals: {
					title: 'Test'
				}
			});
		 * 
		 * @param {type} config
		 * @returns {undefined}
		 */
		Notifications.prototype.add = function(config) {
			config.fromClient = true;
			config.id = this.clientNotifications.length * -1;
			
			this.clientNotifications.push(config);
			this.unseenCount++;
			
			this.store.loadData([config], true);
		};


		return new Notifications();
	}]);