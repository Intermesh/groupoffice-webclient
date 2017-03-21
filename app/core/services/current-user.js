
'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Services.CurrentUser
 *
 * @description
 * Model of the current user. Has all the user properties defined in the server
 * user model.
 */
angular.module('GO.Core')
				.service('GO.Core.Services.CurrentUser', [
					"GO.Core.Services.ServerAPI",
					"$q",
					"$http",
					function (ServerAPI, $q, $http) {

						var CurrentUser = function () {
							this.authenticated = $q.defer();
						};
						
						CurrentUser.prototype.whenAuthenticated = function() {
							return this.authenticated.promise;
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
				
						
						CurrentUser.prototype.getDefaultState = function() {
							return localStorage['go-default-state'];
						};
						
						CurrentUser.prototype.setDefaultState = function(state) {
							localStorage['go-default-state'] = state;
						};


						return new CurrentUser();
					}]);