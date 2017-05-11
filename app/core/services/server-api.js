'use strict';
/**
 * @ngdoc service
 * @name GO.Core.Services.ServerAPI
 * @description
 * Common utilities
 */
angular.module('GO.Core').
		service('GO.Core.Services.ServerAPI', [ 
			function () {

				var ServerAPI = function () {
					this.baseUrl = localStorage.baseUrl || "../../groupoffice-server/html/index.php/";

					//Use sessionStorage from browser so it survives browser reloads
					this.defaultParams = angular.fromJson(sessionStorage.defaultParams);
					
					this.headers = {};
				};
				
				var id =0;
				
				ServerAPI.prototype.getID = function() {
					id++;
					
					return "go-"+id;
				};
				
				
						//use own getcookie function as $cookies seems to suffer from a small delay tat we realy don't need here.
				//I had to use $timeout(getcookie, 100) here.
				ServerAPI.prototype.getCookie = function (cname) {
					var name = cname + "=";
					var ca = document.cookie.split(';');
					for(var i=0; i<ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0)==' ') c = c.substring(1);
						if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
					}
					return null;
				};
				
				ServerAPI.prototype.setXSRFToken = function(t) {
					this.headers['X-XSRFToken'] = t;
				};
				
				ServerAPI.prototype.getXSRFToken = function() {
					return this.headers['X-XSRFToken'];
				};
				
				ServerAPI.prototype.setDebug = function(enabled) {
					this.headers['X-Debug'] = enabled ? "1" : "0";
				};
				
				ServerAPI.prototype.debugEnabled = function() {
					return this.headers['X-Debug'] === "1";
				};
				
				ServerAPI.prototype.getFlowInit = function(options){
					
					options = options || {};
					
					return angular.extend({
							target: this.url('upload'),
							permanentErrors: [404, 500, 501],
							maxChunkRetries: 1,
							chunkRetryInterval: 5000,
							simultaneousUploads: 4,
							headers: {
								'X-XSRFToken' : this.getXSRFToken()
							}
						}, options);
				};
				
//				ServerAPI.prototype.setAccessToken = function(accessToken, remember) {
//					
//					if(accessToken) {
//						$http.defaults.headers.common.Authorization = 'Bearer '+accessToken;		
//					}else
//					{
//						delete $http.defaults.headers.common.Authorization;
//					}
//					
//					$rootScope.oauth2AccessToken = sessionStorage.accessToken = accessToken;
//
//					if(remember) {
//						localStorage.accessToken = data.access_token;
//					}else
//					{
//						delete localStorage.accessToken;
//					}
//				};
//				
//				ServerAPI.prototype.getAccessToken = function(){					
//					
//					if(sessionStorage.accessToken) {
//						return sessionStorage.accessToken;
//					}
//					
//					if(localStorage.accessToken) {
//						return localStorage.accessToken;
//					}
//					
//					return null;
//				};

				/**
				 * @ngdoc method
				 * @name GO.Core.Services.ServerAPI#setBaseUrl
				 * @description
				 * 
				 * Set the base URL for the url function
				 * 
				 * @param {string} url				 
				 */
				ServerAPI.prototype.setBaseUrl = function (url) {

					//Use localStorage to remember it for the user
					this.baseUrl = localStorage.baseUrl = url.replace(/^\s+|[\s\/]+$/g, '') + '/';
				};

				/**
				 * @ngdoc method
				 * @name GO.Core.Services.ServerAPI#setDefaultParams
				 * @description
				 * 
				 * Set's default parameters for all URL's generated with the ServerAPI.url funciton
				 * 
				 * @param {object} defaultParams				 
				 */
				ServerAPI.prototype.setDefaultParams = function (defaultParams) {
					this.defaultParams = defaultParams;

					sessionStorage.defaultParams = angular.toJson(defaultParams);
				};

				ServerAPI.prototype.download = function (blobId) {
					window.open(this.url('download/'+blobId));
				};

				ServerAPI.prototype.thumbUrl = function(blobId, p) {
					return this.url('thumb/'+blobId, {w:p.w,h:p.h});
				};

				/**
				 * @ngdoc method
				 * @name GO.Core.Services.ServerAPI#url
				 * @description
				 * Create a URL to the API server
				 *
				 * @param {string} route The controller route. Eg. intermesh/auth/auth/login
				 * @param {object=} Key value pair with GET parameters. If the value is not a string it will be converted to JSON.
				 * @returns {string} URL The Full url
				 */
				ServerAPI.prototype.url = function (route, params) {
					
					if (!route && !params)
						return this.baseUrl;

					var url = this.baseUrl + route;

					params = params || {};

					angular.extend(params, this.defaultParams);

					var amp = false;

					if (params) {
						for (var name in params) {
							switch(typeof params[name]) {
								case 'string':
									break;
								case 'boolean':
									params[name] = params[name] ? '1' : '0';
									break;
									
								default:
									params[name] = angular.toJson(params[name]);
									break;
							}

							if (amp) {
								url += '&';
							} else {
								url += '?';
								amp = true;
							}

							url += name + "=" + encodeURIComponent(params[name]);
						}
					}
					return url;
				};

				return new ServerAPI;
			}]);