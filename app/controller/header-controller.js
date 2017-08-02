'use strict';
/**
 * When the application loads this controller checks if the user is logged in.
 * If the user is logged in it will redirect to the dashboard state. If not then
 * it redirects to the login state.
 */
angular.module('GO.Controllers').controller('GO.Controllers.HeaderController', [
	'$scope',
	'$rootScope',
	'$http',
	'GO.Core.Services.ServerAPI',
	'$state',
	'$mdToast',
	'$mdSidenav',
	'$location',
	'$anchorScroll',
	'GO.Core.Services.CurrentUser',
	'GO.Core.Providers.Translate',
	'GO.Core.Dispatcher',
	'$filter',
	'GO.Config',
	'GO.Core.Services.AccountSync',
	'$mdPanel',
	'$timeout',
	function ($scope, $rootScope, $http, ServerAPI, $state, $mdToast, $mdSidenav, $location, $anchorScroll, CurrentUser, Translate, Dispatcher, $filter, Config, AccountSync, $mdPanel, $timeout) {

		

		$scope.showLaunchpad = false;

		$scope.toggleLaunchpad = function () {
			$scope.showLaunchpad = !$scope.showLaunchpad;
		};
		
		$scope.user = CurrentUser;

		

		//Authenticate				
		
		//Enables debug header X-Debug when CTRL+F7 is hit
//		$scope.keypress = function ($event) {
//
//			if ($event.ctrlKey && $event.keyCode === 118) {
//				ServerAPI.setDebug(!ServerAPI.debugEnabled());
//
//				$mdToast.show($mdToast.simple().position('top right').content("Server API debugging " + (ServerAPI.debugEnabled() ? "enabled" : "disabled")));
////								Alerts.addAlert("Server API debugging "+(ServerAPI.debugEnabled() ? "enabled" : "disabled"), "info");
//			}
//		};

//						Dispatcher.register('loggedin', function (response) {
//							$mdToast.show($mdToast.simple().position('top right').content('Gebruiker: "' + response.username + '" is om ' + $filter('date')(response.lastLogin, "HH:mm") + ' ingelogd.'));
//						});
//						

//						function postDigest(callback){    
//							var unregister = $rootScope.$watch(function(){  
//								unregister();
//								$timeout(function(){
//									callback();
//									postDigest(callback);
//								},0,false);       
//							});
//						}
//
//						postDigest(function(){
//							console.log('Digest');
//						});




	}]);