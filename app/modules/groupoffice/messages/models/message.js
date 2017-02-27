'use strict';

/* @todo Handle sent message promise better */
angular.module('GO.Modules.GroupOffice.Messages').factory('GO.Modules.GroupOffice.Messages.Model.Message', [
	'GO.Core.Factories.Data.Model',	
	'GO.Modules.GroupOffice.Messages.Services.AccountStore',
	function (Model,  AccountStore) {


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

	
		
		Message.prototype.compose = function() {
			return AccountStore.loadIf().then(function(){
				return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().compose({}, this);
			}.bind(this));
		};
		
		Message.prototype.reply = function(all) {
			return AccountStore.loadIf().then(function(){
				return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().reply(this,all);
			}.bind(this));
		};
		
		Message.prototype.forward = function() {
			return AccountStore.loadIf().then(function(){		
				return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().forward(this);
			}.bind(this));
		};

		return Message;

	}]);

