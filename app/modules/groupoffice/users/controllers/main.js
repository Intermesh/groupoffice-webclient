'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Users').controller('GO.Modules.GroupOffice.Users.Controller.Main', [
	'$scope',
	'$http',
	'GO.Core.Services.ServerAPI',
	'GO.Modules.GroupOffice.Users.Model.User',
	'GO.Modules.GroupOffice.Contacts.Model.Contact',
	'$state',
	'GO.Modules.GroupOffice.Contacts.ContactEditor',
	'GO.Core.Services.Dialog',
	'GO.Core.Services.Application',
	'GO.Modules.GroupOffice.Users.Model.Group',
	function ($scope, $http, ServerAPI, User, Contact, $state, ContactEditor, Modal, App, Group) {
		
		var module = App.currentUser.getServerModule('GO\\Core\\Users\\Module');
		if(module) {					
			$scope.usersModule = module;
		};

		$scope.user = new User();
		$scope.store = $scope.user.getStore({
			returnProperties: 'id,username,photoBlobId,lastLogin',
			orderColumn: 't.username',
			orderDirection: 'ASC',
			q:[]
		});


		$scope.selectUser = function (user) {
			$state.go("users.user", {userId: user.id});
		};

		$scope.editContact = function (user) {

			var config = {};

			if (user.contact) {
				config.contact = new Contact();
				config.contact.loadData(user.contact);
			} else
			{
				config.contact = new Contact();
				config.attributes = {userId: user.id};
			}

			ContactEditor.show(config).then(function (data) {
				data.close.then(function (contact) {

					if (contact) {
						user.reload();
					}

				});
			});
		};


		$scope.edit = function (user) {

			if (!user) {
				user = new User();
			}

			Modal.show({
				editModel: user,
				templateUrl: 'modules/groupoffice/users/views/user-edit.html',
				controller: 'GO.Modules.GroupOffice.Users.Controller.UserEdit'
			}).then(function (data) {
				data.close.then(function (user) {
					if (user) {
						$state.go("users.user", {userId: user.id});
					}
				});
			});
		};

		$scope.switchTo = function (user) {
			$http.post(ServerAPI.url('auth/users/' + user.id + '/switch-to')).then(function () {
				document.location = document.location.pathname;
			});
		};
		
		
		
		$scope.groupStore = new Group().getStore();
		$scope.groupStore.load();
		
		$scope.filters = {
			groups: []
		};
		
		
		$scope.updateFilter = function(name, value) {
			
			$scope.filters[name] = value;			
			
			$scope.store.$loadParams.q = [];
			
			//wait for view to be rendered
			if($scope.store.init) {
				if($scope.filters.groups.length) {
					$scope.store.$loadParams.q.push(['joinRelation', 'userGroup']);						
					$scope.store.$loadParams.q.push(['andWhere', {'userGroup.groupId': $scope.filters.groups}]);						
				}
				$scope.store.load();
			}
		};
		
		$scope.editGroup = function (group) {

			if (!group) {
				group = new Group();
			}

			Modal.show({
				editModel: group,
				templateUrl: 'modules/groupoffice/users/views/group-edit.html',
				controller: 'GO.Modules.GroupOffice.Users.Controller.GroupEdit'
			}).then(function (data) {
				data.close.then(function (user) {
					$scope.groupStore.reload();
				});
			});
		};
		
		
		$scope.deleteGroup = function(group) {
			group.delete().then(function() {
					$scope.groupStore.reload();				
			});
		};
		
		
		
		
		$scope.store.load();


//						Modules.getModule('users').then(function (module) {
//							$scope.usersModule = module;
//						});
	}]);
