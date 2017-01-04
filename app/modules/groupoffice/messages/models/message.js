'use strict';

/* @todo Handle sent message promise better */
angular.module('GO.Modules.GroupOffice.Messages').factory('GO.Modules.GroupOffice.Messages.Model.Message', [
	'GO.Core.Factories.Data.Model',
	'GO.Modules.GroupOffice.Contacts.ContactEditor',
	'GO.Modules.GroupOffice.Contacts.Model.Contact',
	'$state',
	'GO.Modules.GroupOffice.Messages.Services.AccountStore',
	function (Model, ContactEditor, Contact, $state, AccountStore) {


		var Message = GO.extend(Model, function (threadId) {
			this.$parent.constructor.call(this, arguments);
			this.threadId = threadId;
		});
		
		Message.prototype.$returnProperties = '*,from[id,address,personal],to[id,address,personal],cc[id,address,personal],attachments,thread';

		Message.prototype.getStoreRoute = function () {
			return 'messages/threads/' + this.threadId + '/messages';
		};

		Message.prototype.getCreateRoute = function () {
			return 'messages';
		};


		Message.prototype.$relations = {
			message: ['id']
		};

		/**
		 * Open contact detail or edit page if contact does not exist
		 * 
		 * @returns {undefined}
		 */
		Message.prototype.openContact = function () {

			var contact = new Contact();

			var store = contact.getStore({returnProperties: 'id'});
			store.$loadParams.q = [
				['andWhere', ['like', {'emailAddresses.email': this.from.address}]],
				['limit', 1],
				['offset', 0]
			];

			return store.load().then(function (data) {

				if (data.store.items.length) {
					$state.go("contacts.contact", {contactId: data.store.items[0].id});
				} else {
					ContactEditor.show({
						contact: new Contact(),
						attributes: {
							name: this.from.personal, emailAddresses: [{email: this.from.address}]
						}
					});
				}
			}.bind(this));
		};				
		
		Message.prototype.compose = function() {
			return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().compose({}, this);
		};
		
		Message.prototype.reply = function(all) {
			return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().reply(this,all);
		};
		
		Message.prototype.forward = function() {
			return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().forward(this);
		};

		return Message;

	}]);

