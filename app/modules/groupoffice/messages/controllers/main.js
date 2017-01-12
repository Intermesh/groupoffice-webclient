'use strict';

GO.module('GO.Modules.GroupOffice.Messages').controller('GO.Modules.GroupOffice.Messages.Controller.Main', [
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
	'GO.Core.Factories.Data.Store',
	function ($scope, Thread, Message, Dialog, $state, mappings, $injector, accountStore, $http, ServerAPI, Store) {

		$scope.thread = new Thread();

		$scope.store = $scope.thread.getStore({
			returnProperties: "id,subject,from[address,personal],excerpt,answered,seen,forwarded,messageCount,lastMessageSentAt,hasAttachments,photoBlobId"
		});

		$scope.store.deleteSelected = function () {

			if (!this.$selected.length) {
				return;
			}

			//in trash folder
			if ($scope.filters.type === 4) {
				return Store.prototype.deleteSelected();
			}

			var deletes = [];

			angular.forEach(this.items, function (model, index) {
				if (model.$selected) {
					deletes.push({
						id: model.id,
						type: 4//trash
					});
				}
			}.bind(this));


			return $http.put(ServerAPI.url('messages/threads'), {
				data: deletes
			}).then(function (response) {
				
				angular.forEach(response.data.data, function (subresponse) {
					var index = this.findIndexByAttribute('id', subresponse.id);
					this.items.splice(index, 1);
				}.bind(this));

				this.select();

			}.bind(this));

		};


		//store for child ThreadController
		//define stuff in the parent controller if you can to prevent screen flicker because models are reinitialized on each page load.
		$scope.threadStore = (new Message()).getStore({
			limit: 5,
			returnProperties: '*,from[address,personal],to[address,personal],cc[address,personal],attachments,thread[accountId]'});//new Store('email/accounts/'+$stateParams.accountId+'/threads/'+$stateParams.threadId, {limit: 5});				


		$scope.updateFilter = function (name, value) {
			$scope.filters[name] = value;
			load();
		};

		function load() {
			$scope.store.$loadParams.q = [];
			$scope.store.$loadParams.type = $scope.filters.type;
			if($scope.filters.accounts.length) {
				$scope.store.$loadParams.q.push(['andWhere', {'accountId': $scope.filters.accounts}]);
			}

			if ($scope.filters.tags.length) {
				$scope.store.$loadParams.q.push(['andWhere', {'tags.id': $scope.filters.tags}]);
			}

			$scope.store.load();
		}

		$scope.accountStore = accountStore;

		var afterCompose = function (openResult) {

			openResult.close.then(function (closeResult) {
				if (closeResult) {
					if (!$state.is('messages.thread', {accountId: closeResult.thread.accountId, threadId: closeResult.threadId})) {

						$state.go('messages.thread', {accountId: closeResult.thread.accountId, threadId: closeResult.threadId});
					} else
					{
						$scope.store.reload();
						$scope.threadStore.reload();
					}

					//force a sync
					$http.get(ServerAPI.url('accounts/' + closeResult.thread.accountId + '/sync'));
				}
			});
		};

		$scope.reply = function (message, all) {
//							accountStore.findModelByAttribute('id', thread.accountId).getAccountModel().reply($scope.threadStore.items[0],all).then(afterCompose);
			message.reply(all).then(afterCompose);
		};

		$scope.forward = function (message) {
//							accountStore.findModelByAttribute('id', thread.accountId).getAccountModel().forward(threadMessage).then(afterCompose);
			message.forward().then(afterCompose);
		};

		$scope.compose = function (attributes, message) {
			accountStore.items[0].getAccountModel().compose(attributes, message).then(afterCompose);
		};

		$scope.selectThread = function (model) {
//							console.profile('thread');
			$state.go('messages.thread', {threadId: model.id});
		};



		$scope.emptyTrash = function () {
			$http.delete(ServerAPI.url("messages/trash", {
				accountId: $scope.filters.accounts
			})).then(function () {
				$scope.store.items = [];
			});
		};


		$scope.emptyJunk = function () {
			$http.delete(ServerAPI.url("messages/junk", {
				accountId: $scope.filters.accounts
			})).then(function () {
				$scope.store.items = [];
			});
		};




		accountStore.load().then(function () {

			if (!accountStore.items[0]) {
				$state.go('messages-setup');
				return;
			}

			$scope.filters = {
				type: 'incoming',
				accounts: [accountStore.items[0].id],
				tags: []
			};

			load();

		});

	}]);
