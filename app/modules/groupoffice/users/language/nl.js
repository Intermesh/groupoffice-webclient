angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("nl",  {
							"GO\\Core\\Users\\Model\\User": 'Gebruiker',
							"GO\\Core\\Users\\Module": 'Gebruikers',
							"userLoggedIn" : "ingelogd",
							"login": "Inloggen",
							"logout": "Uitloggen",
							"Change password": "Wachtwoord veranderen"
							
						});
					}]);


