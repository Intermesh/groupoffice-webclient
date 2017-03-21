'use strict';


angular.module('GO.Controllers').controller('GO.Controllers.LoginController', [
	'$scope',
	'$rootScope',
	'$http',
	'$state',
	'$location',
	'GO.Core.Services.ServerAPI',
	'GO.Core.Services.Application',
	'$mdToast',
	'GO.Core.Providers.Translate',
	'GO.Core.Services.CurrentUser',
	'$mdDialog',
	function ($scope, $rootScope, $http, $state, $location, ServerAPI, Application, $mdToast, Translate, CurrentUser, $mdDialog) {
		
		
		function afterLogin() {
			Application.serverModules.fetchModules().then(function() {
				
				$rootScope.loggedIn = true;
				if ($rootScope.stateBeforeAuth) {
					$location.url($rootScope.stateBeforeAuth);
					delete $rootScope.stateBeforeAuth;
				} else
				{
					var s = CurrentUser.getDefaultState();
					if(!s)  {
						s = 'dashboard';
					}
					$state.go(s);
				}
				
			});
		}

		if (!$rootScope.loggedIn) {
			$scope.checkingAuth = true;
			$http.get(ServerAPI.url('auth', {returnProperties: '*,user[*,group[*]]'})).then(function (response) {

				if (response.data.success) {
					
					ServerAPI.setXSRFToken(response.data.data.XSRFToken);
					$rootScope.XSRFToken = ServerAPI.getXSRFToken();
					
					CurrentUser.setProperties(response.data.data.user);
					afterLogin();					

				} else
				{
					$scope.checkingAuth = false;
				}
			});
		}

		$scope.master = $scope.user = {
			username: '',
			password: '',
			remember: false
		};

		$scope.config = {url: ServerAPI.baseUrl || "http://localhost/groupoffice-server/html/"};

		$scope.login = function (user) {

			//We set the base Group-Office URL given from the form.
			ServerAPI.setBaseUrl($scope.config.url);

			var url = ServerAPI.url('auth', {returnProperties: '*,user[*]'});

			$http.post(url, {data: user}).then(function (response) {

				ServerAPI.setXSRFToken(response.data.data.XSRFToken);
				$rootScope.XSRFToken = ServerAPI.getXSRFToken();
				
				CurrentUser.setProperties(response.data.data.user);
				afterLogin();
			}).catch(function (e) {

								$mdToast.show($mdToast.simple().position('top right').content(Translate.t('You entered an incorrect username or password')));
//							Alerts.addAlert(Translate.t('You entered an incorrect username or password'), 'warning');
							});
		};

		$scope.reset = function () {
			$scope.user = angular.copy($scope.master);
		};


		$scope.forgotPassword = function () {
			var prompt = $mdDialog.prompt()
							.title(Translate.t('Reset password'))
							.textContent(Translate.t('Please enter an e-mail address to find your user and send a password reset link'))
							.ok(Translate.t('Send'))
							.cancel(Translate.t('Cancel'));

			$mdDialog
							.show(prompt)
							.then(function (email) {
//								var store = new Store('contacts');
//								store.$loadParams.q = [
//									'andWhere', ['>',{'goUserId': 0}]
//							];

								$http.post(ServerAPI.url('auth/forgotpassword/' + email), {
									subject: "Recover your password",
									body: "Hi {{user.username}},\n\nYou requested a link to reset your password. Please go to " + $state.href('resetpassword', {}, {absolute: true}) + '?token={{token}}&userId={{user.id}}'
								}).then(function (response) {

									var msg;
									if (response.data.success) {
										msg = Translate.t("An e-mail was sent to {email}", {email: email});
									} else
									{
										msg = Translate.t("An error occured");
									}
									$mdDialog.show($mdDialog.alert().textContent(msg).ok(Translate.t('Continue')));
								});
							})
							.finally(function () {
								prompt = undefined;
							});
		};
	}]);
