'use strict';

function QuoteStripper(body) {
	/**
	 * @type string
	 */
	this.body = body;
	this.bodyWithoutQuote = null;
	this.quote = null;
}

QuoteStripper.prototype.getBodyWithoutQuote = function () {
	if (this.quote === null) {
		this._split();
	}

	return this.bodyWithoutQuote;
};

QuoteStripper.prototype.getQuote = function () {
	if (this.quote === null) {
		this._split();
	}

	return this.quote;
};

QuoteStripper.prototype._split = function () {
	var quoteIndex = this._findByBlockQuote();

	if (quoteIndex === -1) {
		quoteIndex = this._findByGreaterThan();
	}
	
	if (quoteIndex === -1) {
		quoteIndex = this._findQuoteByHeaderBlock();
	}

	if (quoteIndex > -1) {
		this.bodyWithoutQuote = this.body.substring(0, quoteIndex);
		this.quote = this.body.substring(quoteIndex);
	} else {
		this.bodyWithoutQuote = this.body;
		this.quote = "";
	}
};

QuoteStripper.prototype._findByGreaterThan = function () {
	var pattern = /\n&gt;/;

	var match = pattern.exec(this.body);

	if (match) {
		return pattern.lastIndex;
	}

	return -1;
};

QuoteStripper.prototype._findByBlockQuote = function () {
	this.quoteIndex = this.body.indexOf("<blockquote");

	return this.quoteIndex;
};

QuoteStripper.prototype._splitLines = function () {
	if (!this.lines) {
		var br = '|BR|';

		var html = this.body
						.replace(/<\/p>/ig, br + "$&")
						.replace(/<\/div>/ig, br + "$&")
						.replace(/<br[^>]*>/ig, br + "$&");

		this.lines = html.split(br);
	}
	return this.lines;
};


	/**
	 * eg
	 * 
	 * Van: Merijn Schering [mailto:mschering@intermesh.nl] 
	  Verzonden: donderdag 20 november 2014 16:40
	  Aan: Someone
	  Onderwerp: Subject
	 * 
	 * @return int|boolean
	 */
QuoteStripper.prototype._findQuoteByHeaderBlock = function() {

		var lines = this._splitLines(this.body);

		var pos = 0;

		for (var i = 0, c = lines.length; i < c; i++) {

			var plain = lines[i].replace(/(<([^>]+)>)/ig,""); //strip html tags
			var pattern = /[a-z]+:\s*[a-z0-9\._\-+\&]+@[a-z0-9\.\-_]+/i;
			//Match:
			//ABC: email@domain.com
			if (plain.match(pattern)) {			
				return pos;
			}

			pos += lines[i].length;
		}
		return -1;
	};

/* @todo Handle sent message promise better */
angular.module('GO.Modules.GroupOffice.Messages').factory('GO.Modules.GroupOffice.Messages.Model.Message', [
	'GO.Core.Factories.Data.Model',
	'GO.Modules.GroupOffice.Messages.Services.AccountStore',
	function (Model, AccountStore) {


		var Message = GO.extend(Model, function (threadId) {
			this.$parent.constructor.call(this, arguments);
			this.threadId = threadId;


		});

		Message.prototype.loadData = function (data, clearModified) {
			this.$parent.loadData.call(this, data, clearModified);

			this.$quoteStripper = new QuoteStripper(data.body);

		};

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



		Message.prototype.compose = function () {
			return AccountStore.loadIf().then(function () {
				return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().compose({}, this);
			}.bind(this));
		};

		Message.prototype.reply = function (all) {
			return AccountStore.loadIf().then(function () {
				return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().reply(this, all);
			}.bind(this));
		};

		Message.prototype.forward = function () {
			return AccountStore.loadIf().then(function () {
				return AccountStore.findModelByAttribute('id', this.thread.accountId).getAccountModel().forward(this);
			}.bind(this));
		};

		Message.prototype.getBodyWithoutQuote = function () {
			return this.$quoteStripper.getBodyWithoutQuote();
		};

		Message.prototype.getQuote = function () {
			return this.$quoteStripper.getQuote();
		}

		return Message;

	}]);

