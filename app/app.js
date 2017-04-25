'use strict';

angular.module('GO', GO.appModules.concat([
	'angular-chartist'
])).config(['$stateProvider', '$urlRouterProvider', '$uiViewScrollProvider', function ($stateProvider, $urlRouterProvider, $uiViewScrollProvider) {
		// For any unmatched url, redirect to /state1
		
		
		$uiViewScrollProvider.useAnchorScroll();

		$urlRouterProvider.when('', '/login');
		$urlRouterProvider.otherwise("/404");

		// Now set up the states
		$stateProvider.state('404', {
			url: "/404",
			templateUrl: "views/404.html"
		}).state('login', {
			url: "/login",
			templateUrl: "views/login.html",
			controller: 'GO.Controllers.LoginController',
			data: {
				noAuth: true
			}
		}).state('resetpassword',{
			controller: 'GO.Controllers.ResetPasswordController',
			url: '/resetpassword?token&userId',
			templateUrl:'views/resetpassword.html',
			data: {
				noAuth: true
			}
		}).state('settings', {
			url: "/settings",
			templateUrl: "views/settings/main.html",
			controller: "GO.Controllers.SettingsController"
		}).state('settings.accounts', {
			url: "/accounts",
			templateUrl: "views/settings/accounts.html",
			controller: "GO.Controllers.AccountsController"
		}).state('settings.core', {
			url: "/core",
			templateUrl: "views/settings/core.html",
			controller: "GO.Controllers.CoreSettingsController"
		});


	}]).run([
	'GO.Core.Services.ServerAPI', 
	'$rootScope', 
	'GO.Config',
	'$state',
	'$timeout',	
	'$location', 
	'$anchorScroll', 

	function (ServerAPI, $rootScope, Config, $state, $timeout, $location, $anchorScroll) {
		$rootScope.GO = GO;
		$rootScope.showMask = false;

		$rootScope.title = Config.title;
		$rootScope.$state = $state;
		
		$rootScope.logo = Config.logo || "resources/groupoffice-logo-full.png";
		$rootScope.shortCutIcon = Config.shortCutIcon || "../app/resources/groupoffice-logo.png";

		ServerAPI.setBaseUrl(Config.APIUrl);		
		$rootScope.APIUrl = Config.APIUrl;
		
		
		
		var authListener = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			if (!$rootScope.loggedIn && (!toState.data || !toState.data.noAuth)) {
				
				event.preventDefault();
				
				$rootScope.stateBeforeAuth = $location.url();				
				$state.go('login');
			}else
			{				
				//remove listener
				authListener();
			}
		});		
		
		//for full screen loading mask
		$rootScope.showMask = false;

		
		$rootScope.goto = function (id) {
			// set the location.hash to the id of
			// the element you wish to scroll to.
//			$location.hash(id);

			// call $anchorScroll()
			$anchorScroll(id);
		};
		

//						FastClick.attach(document.body);
	}]).config(['$mdThemingProvider', function ($mdThemingProvider) {
		var customBlueMap = $mdThemingProvider.extendPalette('blue-grey', {
			'contrastDefaultColor': 'light',
			'contrastDarkColors': ['50', '100'],
//			'50': 'FFFFFF',
//			'100': 'f1f1f1',
//			'300': '21C1EF',
//			'400': '10B3E2',
			'500': '0E9CC5'
//			'600': '0C85A8',
//			'700': '0A6F8C'
		});
		

		$mdThemingProvider.definePalette('customBlue', customBlueMap);
		$mdThemingProvider.theme('default')
						.primaryPalette('customBlue', {
							'default': '500'
//							'hue-1': '100'
//							'hue-2': '50'
						})
						.accentPalette('light-green', {
							'default': '700'
						})
						.backgroundPalette('grey', {
							'default': 'A100' //change background to white
						});
						
					

//		$mdThemingProvider.theme('input', 'default')
//										.primaryPalette('grey');
						
	}]).config(['$mdIconProvider', function ($mdIconProvider) {
		// Configure URLs for icons specified by [set:]id.
		$mdIconProvider.defaultFontSet('material-icons');
	}]).config(['$animateProvider', function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
  }]).config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {


		$mdDateLocaleProvider.formatDate = function (date) {
			
			return date ? moment(date).format('DD-MM-YYYY') : '';
		};

		$mdDateLocaleProvider.parseDate = function (dateString) {			
			var m = moment(dateString, 'DD-MM-YYYY', true);
			return m.isValid() ? m.toDate() : new Date();
		};
	}]).config(['$mdAriaProvider',function($mdAriaProvider) {
		// Globally disables all ARIA warnings.
		$mdAriaProvider.disableWarnings();
 }]).config(['$qProvider', function ($qProvider) {
	 
		//Avoid unhandled rejections error: http://stackoverflow.com/questions/41063947/angular-1-6-0-possibly-unhandled-rejection-error
    $qProvider.errorOnUnhandledRejections(false);
}]);