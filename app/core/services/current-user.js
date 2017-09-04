
'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Services.CurrentUser
 *
 * @description
 * Model of the current user. Has all the user properties defined in the server
 * user model.
 */
angular.module('GO.Core').service('GO.Core.Services.CurrentUser', [
	"GO.Core.Services.ServerAPI",
	"$q",
	"$http",
	"$rootScope",
	function (ServerAPI, $q, $http, $rootScope) {

		var CurrentUser = function () {
			this.authenticated = $q.defer();
		};

		CurrentUser.prototype.whenAuthenticated = function () {
			return this.authenticated.promise;
		};


		CurrentUser.prototype.hasServerModule = function(name) {
			this.getServerModule(name) !== false;
		};
		
		
		CurrentUser.prototype.getServerModule = function(name) {
			for(var i = 0, l = this.modules.length; i < l; i++) {
				if(this.modules[i].name === name && (this.modules[i].permissions === null  || this.modules[i].permissions.read)) {
					return this.modules[i];
				}
			}
			
			return false;		
		};



		CurrentUser.prototype.setProperties = function (props) {
			angular.extend(this, props);

			this.authenticated.resolve(this);
		};

		CurrentUser.prototype.changePassword = function () {
			console.log('changePassword');
		};


		CurrentUser.prototype.logout = function () {

			var url = ServerAPI.url('auth');

			$http.delete(url).then(function (response) {
				//make sure page is cleared
				document.location = "";
			});
		};
		
		CurrentUser.prototype.login = function(username, password) {
				
			//We set the base Group-Office URL given from the form.
//			ServerAPI.setBaseUrl($scope.config.url);

			var url = ServerAPI.url('auth', {returnProperties: '*,user[*]'});

			return $http.post(url, {data: {username: username, password: password} }).then(function (result) {

				$rootScope.loggedIn = true;
				this.setProperties(result.data.data.user);
				
				ServerAPI.setAccessToken(result.data.data.accessToken);
				return result;
			}.bind(this));
		};


		CurrentUser.prototype.getDefaultState = function () {
			return localStorage['go-default-state'];
		};

		CurrentUser.prototype.setDefaultState = function (state) {
			localStorage['go-default-state'] = state;
		};


		return new CurrentUser();
	}]);