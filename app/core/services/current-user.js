
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
	"$mdDialog",
	function (ServerAPI, $q, $http, $rootScope, $mdDialog) {

		var CurrentUser = function () {
			this.authenticated = $q.defer();
		};

		CurrentUser.prototype.whenAuthenticated = function () {
			return this.authenticated.promise;
		};


		CurrentUser.prototype.hasServerModule = function(name) {
			return this.getServerModule(name) !== false;
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
				
				this.forcePasswordChangePopupCheck(password);
				
				ServerAPI.setAccessToken(result.data.data.accessToken);
				return result;
			}.bind(this));
		};
		
		/**
		 * This function show a password reset popup when the user 
		 * is required to change the password.
		 * 
		 * @return {undefined}
		 */
		CurrentUser.prototype.forcePasswordChangePopupCheck = function(password) {
			

			if(this.forcePasswordChange){
				if(!password){
					this.logout();
				}
				
				$mdDialog.show({
					locals: {currentPassword: password},
					templateUrl: 'core/components/users/force-password-change.html',
					controller: 'GO.Core.Components.Users.ForcePasswordChange',
					escapeToClose: false,
					clickOutsideToClose: false
				});
			}
			
		};
		
		/**
		 * This function changes the password but only when the user is forced to change it.
		 * 
		 * @return {undefined}
		 */
		CurrentUser.prototype.ChangePassword = function(currentPassword) {

			if(this.forcePasswordChange){
				var url = ServerAPI.url('auth/users/'+this.id+'/change-password',{});
				
				return $http.put(url, {password: this.password, currentPassword:currentPassword}).then(function (response) {
					if(response.status === 200){
						return true;
					} else {	
						return false;
					}
				}).catch(function(response){
					this.validationErrors = response.data.data.validationErrors;
					return false;
				}.bind(this));
			}
			
		};


		CurrentUser.prototype.getDefaultState = function () {
			return localStorage['go-default-state'];
		};

		CurrentUser.prototype.setDefaultState = function (state) {
			localStorage['go-default-state'] = state;
		};


		return new CurrentUser();
	}]);