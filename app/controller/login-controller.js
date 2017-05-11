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
							.title(Translate.t('Reset your password'))
							.textContent(Translate.t('Please enter your registered e-mail address to receive a link to reset your password.'))
							.ok(Translate.t('Send'))
							.cancel(Translate.t('Cancel'));

			$mdDialog
							.show(prompt)
							.then(function (email) {
//								var store = new Store('contacts');
//								store.$loadParams.q = [
//									'andWhere', ['>',{'goUserId': 0}]
//							];

								var link = document.location.origin + document.location.pathname + $state.href('resetpassword') + '?token={{token}}&userId={{user.id}}';
								
								var body = Translate.t("Hi {{user.username}},\n\nYou've requested a link to reset your password. Please click the link below: {link}\n\nIf you didn't request this link then please discard this e-mail and notify your system adminstrator.").replace('{link}', link);

								$http.post(ServerAPI.url('auth/forgotpassword/' + email), {
									subject: Translate.t("Reset your password"),
									body: body
								}).then(function (response) {

									var msg;
									if (response.data.success) {
										msg = Translate.t("The e-mail was sent to {email}.", {email: email});
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
