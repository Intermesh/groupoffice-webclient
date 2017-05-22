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
	'$transitions',
	function (App, Translate, $rootScope, Config, $timeout, $state, ServerAPI, $mdToast, $transitions) {
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
					
					localStorage['go-default-state'] = launcher.state;
					
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
				
				//Updates page title
				$transitions.onFinish({}, function ($transition) {
					var toState = $transition.$to();					
					updateTitle(toState.name);
				});
				
				
				//get launchers when logged in
				
				var loggedInWatch = $rootScope.$watch('loggedIn', function (newValue, oldValue) {
					if (newValue) {								
						$timeout(function(){
							updateTitle($state.current.name);
						});

						scope.launchers = App.launchers;
						
						//removes loggedIn watcher
						loggedInWatch();
					}
				});
			}
		
	};
}]);