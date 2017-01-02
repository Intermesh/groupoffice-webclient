'use strict';

angular.module('GO.Modules.GroupOffice.Imap').factory('GO.Modules.GroupOffice.Imap.Model.Account', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.Dialog',
	'GO.Modules.GroupOffice.Messages.Model.Message',
	'GO.Modules.GroupOffice.Smtp.Model.Account',
	'$state',
	'$filter',
	function (Model, Dialog, Message, SmtpAccount, $state, $filter) {

		//Extend the base model and set default return proeprties
		var Account = GO.extend(Model, function () {

			this.$parent.constructor.call(this, arguments);
			this.$baseParams = {
				returnProperties: "*,smtpAccount[*,coreAccount],signatures"
			};

		});

		Account.prototype.getStoreRoute = function () {
			return 'imap/accounts';
		};

		Account.prototype.addSignature = function () {
			this.signatures.push({});
		};

		Account.prototype.compose = function (attributes, message) {
			
			if(!message) {
				message = new Message();			
			}
			message.$baseParams.accountId = this.id;
			
			return Dialog.show({
				templateUrl: 'modules/groupoffice/imap/views/composer.html',
				controller: 'GO.Modules.GroupOffice.Imap.Controller.Composer',
				editModel: message,
				inputs: {
					account: this,
					attributes: attributes
				}
			});
		};


		Account.prototype.reply = function (lastMessage, all) {
//console.log(lastMessage);
			var attributes = {
				thread: {id: lastMessage.threadId},

				inReplyToId: lastMessage.id,
				to: [{
						//full: lastMessage.from.personal ? '"' + lastMessage.from.personal + '" <' + lastMessage.from.address + '>' : lastMessage.from.address,
						personal: lastMessage.from.personal,
						address: lastMessage.from.address
					}],
				subject: "Re: " + lastMessage.subject,
				body: '<br /><i>' + lastMessage.from.personal +
								' wrote:</i><br /><blockquote style="border-left: 2px solid #0E9CC5; padding-left: 10px;">' + lastMessage.body + '</blockquote>',
				attachments: []


			};

			//reattach inline images
			var a;
			for (var i = 0, l = lastMessage.attachments.length; i < l; i++) {
				a = lastMessage.attachments[i];

				//inline image
				if (a.contentId) {
					attributes.attachments.push({
						src: a.url, //This URL will be replaced by the contentId generated on the server
						origAttachmentId: a.id, //The server will use this to copy the data from.
						name: a.name //Name of the attachment
					});
				}
			}

			if (all) {
				angular.forEach(lastMessage.to, function (recipient) {
					if (recipient.address !== this.smtpAccount.fromEmail) {
						attributes.to.push({
							//full: recipient.personal ? '"' + recipient.personal + '" <' + recipient.address + '>' : recipient.address,
							personal: recipient.personal,
							address: recipient.address
						});
					}
				}.bind(this));


				if (this.cc) {

					attributes.cc = [];
					angular.forEach(lastMessage.cc, function (recipient) {
						if (recipient.address !== this.smtpAccount.fromEmail) {
							attributes.cc.push({
								personal: recipient.personal,
								address: recipient.address
							});
						}
					}.bind(this));
				}
			}
			
			var message = new Message();
			message.$baseParams.accountId = this.id;

			return Dialog.show({
				templateUrl: 'modules/groupoffice/imap/views/composer.html',
				controller: 'GO.Modules.GroupOffice.Imap.Controller.Composer',
				editModel: message,
				inputs: {
					account: this,
					attributes: attributes
				}
			});


		};


		Account.prototype.forward = function (message) {
			var to = "";

			angular.forEach(message.to, function (r) {
				to += '"' + r.personal + '" &lt;' + r.address + '&gt;, ';
			});

			to.replace(/[, ]$/, '');


			var attributes = {

				body: '<br />------- Forwarded message -------' +
								'<table cellpadding="4">' +
								'<tr><td>Subject:</td><td>' + message.subject + '</td></tr>' +
								'<tr><td>Date:</td><td>' + $filter('date')(message.sentAt, 'medium') + '</td></tr>' +
								'<tr><td>From:</td><td>"' + message.from.personal + '" &lt;' + message.from.address + '&gt;</td></tr>' +
								'<tr><td>To:</td><td>' + to + '</td></tr>' +
								'</table>' +
								'<br />' + message.body + message.quote,
				subject: "Fwd: " + message.subject,
				attachments: []

			};

			//reattach
			var a;
			for (var i = 0, l = message.attachments.length; i < l; i++) {
				a = message.attachments[i];

				//inline image
				if (a.contentId) {
					attributes.attachments.push({
						src: a.url, //This URL will be replaced by the contentId generated on the server
						origAttachmentId: a.id, //The server will use this to copy the data from.
						name: a.name //Name of the attachment
					});
				} else
				{
					attributes.attachments.push({
						origAttachmentId: a.id, //The server will use this to copy the data from.
						name: a.name //Name of the attachment
					});
				}
			}
			
			var message = new Message();
			message.$baseParams.accountId = this.id;

			return Dialog.show({
				templateUrl: 'modules/groupoffice/imap/views/composer.html',
				controller: 'GO.Modules.GroupOffice.Imap.Controller.Composer',
				editModel: message,
				inputs: {
					account: this,
					attributes: attributes
				}
			});
		};

		return Account;
	}]);
