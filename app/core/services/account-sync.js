'use strict';

/* Controllers */
angular.module('GO.Core').service('GO.Core.Services.AccountSync', [
	'$http',
	'GO.Core.Services.ServerAPI',
	'$interval',
	'GO.Core.Factories.Models.Account',
	function ($http, ServerAPI, $interval, Account) {

		var AccountSync = function () {
			this.accounts = (new Account()).getStore({limit: 0});

			this.active = false;
			
			this.statusText = "";

			this.queue = [];
		};
		AccountSync.prototype.init = function () {
			
			//temp disabled
//			return false;

			this.accounts.load().then(function () {
				
				this._requeue();
				this._processQueue();

				$interval(function () {

					if (this.active) {
						return;
					}
					this._requeue();
					this._processQueue();

				}.bind(this), 60000);
			}.bind(this));
		};
		
		
		AccountSync.prototype._requeue = function() {
			if (!this.queue.length) {
				//requee
				var r;
				for (var i = 0, l = this.accounts.items.length; i < l; i++) {
					r = this.accounts.items[i];

					if (!r.isSyncable) {
						continue;
					}

					r.$syncStatus = {
						text: "Waiting...",
						progress: null,
						active: false
					};

					this.queue.push(r);
				}
			}
		};
		
		AccountSync.prototype.syncSingle = function(accountId) {
			
			//check if in queue
			for(var i=0,l=this.queue.lenth;i<l;i++) {
				if(this.queue[i].id == accountId) {
					//account already queued for syncing
					return;
				}
			}
			for (var i = 0, l = this.accounts.items.length; i < l; i++) {
				if(this.accounts.items[i].id==accountId){
					this.queue.push(this.accounts.items[i]);
				}
			}
			
			//account is now queued
			if(!this.active) {
				this._processQueue();
			}
			
		};


		AccountSync.prototype._processQueue = function () {
			var next = this.queue.shift();
			if(!next) {
				return;
			}
			this._syncInterval(next);

			if (!this.queue.length) {
				this._checkActive();
			}
		};



		AccountSync.prototype._checkActive = function () {
			var active = false;
			for (var i = 0, l = this.accounts.items.length; i < l; i++) {
				if (!this.accounts.items[i].isSyncable) {
					continue;
				}

				if (this.accounts.items[i].$syncStatus.active) {
					active = true;
					break;
				}
			}

			this.active = active;
		};

		AccountSync.prototype._syncInterval = function (r) {

			r.active = this.active = true;
			this.statusText = "Sync in progress for account "+r.name;

			$http.get(ServerAPI.url('accounts/' + r.id + '/sync')).then(function (response) {

				r.$syncStatus.progress = response.data.data.progress;
//				sync.accounts[accountId].accountData = result.account;


				if (r.$syncStatus.progress !== 100) {
					this._syncInterval(r);
				} else
				{
					this._processQueue();
				}
			}.bind(this)).catch(function() {
				this._processQueue();
			}.bind(this));
		};

		return new AccountSync;

	}]);