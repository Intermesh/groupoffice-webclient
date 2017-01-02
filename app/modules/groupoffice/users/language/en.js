angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("en",  {
							"GO\\Core\\Users\\Model\\User": 'User',
							"GO\\Core\\Users\\Module": 'Users',
							"userLoggedIn" : "logged in",
							"login": "Login",
							"logout": "Logout"							
							
						});
					}]);

