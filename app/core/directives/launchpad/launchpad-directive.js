'use strict';

/*
 * @todo put fetching of laumnchers in here
 */
angular.module('GO.Core').directive('goLaunchpad', [
	'GO.Core.Services.Application',
	'GO.Core.Providers.Translate', 
	'$rootScope',
	'GO.Config',
	'$timeout',
	'$state',
	'GO.Core.Services.ServerAPI',
	'$mdToast',
	function (App, Translate, $rootScope, Config, $timeout, $state, ServerAPI, $mdToast) {
	return {
		restrict: 'E',
		scope: {
			show: '='
		},
		templateUrl: 'core/directives/launchpad/launchpad.html',
		link: function (scope, element, attrs, ctrl, transclude) {
	
				scope.show = false;
				scope.toggle = function() {
					scope.show = !scope.show;
					
				};
				
				scope.openLauncher = function(launcher, $event) {
					
					if($event.ctrlKey) {
						var url = $state.href(launcher.state);
						var win = window.open(url);						
						$timeout(function(){
							win.focus();
						});
					}else{
						$state.go(launcher.state);
					}
				};				
				
				scope.keypress = function(e) {
						
				
					if (e.ctrlKey && e.keyCode === 118) {
						ServerAPI.setDebug(!ServerAPI.debugEnabled());
						$mdToast.show($mdToast.simple().position('top right').content("Server API debugging " + (ServerAPI.debugEnabled() ? "enabled" : "disabled")));
					}
					
					if(e.keyCode == 27) { //esc
							scope.show = false;
					}
				};
				
				scope.$watch('show', function(newValue, oldValue) {
						if (newValue) {
							$timeout(function(){
//								var buttons = element.find('button');
//								buttons[0].focus();

								angular.element(document.getElementById('launchpad')).focus();
							}, 10);
						}	
				});
				
//				/**
//				 * Listen to the moduleInstalled event
//				 * When triggered, update the launchers in the launcher.
//				 */
//				$rootScope.$on('moduleInstalled', function(){
//					ClientModules.reload();
//					ClientModules.fetchLaunchers().then(function(launchers) {
//							scope.launchers = launchers;
//						});
//				});
//				
//				/**
//				 * Listen to the moduleUninstalled event
//				 * When triggered, update the launchers in the launcher.
//				 */
//				$rootScope.$on('moduleUninstalled', function(){
//					ClientModules.reload();
//					ClientModules.fetchLaunchers().then(function(launchers) {
//							scope.launchers = launchers;
//						});
//				});
				
				var updateTitle = function(stateName){
					var launcher = App.fetchLauncherByState(stateName);
					if(launcher) {
						$rootScope.title = Config.title+": "+Translate.t(launcher.title);
						$rootScope.appTitle = Translate.t(launcher.title);
					}else
					{
						$rootScope.appTitle = $rootScope.title = Config.title;
					}
				};
				
				//get launchers when logged in
				var loggedInWatch = $rootScope.$watch('loggedIn', function (newValue, oldValue) {
					if (newValue) {		
						
						updateTitle($state.current.name);
						//Updates page title
						$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
							updateTitle(toState.name);
						});

						scope.launchers = App.launchers;
						
						//removes loggedIn watcher
						loggedInWatch();
					}
				});
			}
		
	};
}]);