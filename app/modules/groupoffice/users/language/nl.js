angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("nl",  {
							"GO\\Core\\Users\\Model\\User": 'Gebruiker',
							"GO\\Core\\Users\\Module": 'Gebruikers',
							"userLoggedIn" : "ingelogd",
							"login": "Inloggen",
							"logout": "Uitloggen",
							"Change password": "Wachtwoord veranderen",

    "No users found": "No users found",
    "Current password": "Current password",
    "The password was incorrect": "The password was incorrect",
    "New password": "New password",
    "The passwords don't match": "The passwords don't match",
    "Sorry, this username is already taken.": "Sorry, this username is already taken.",
    "Invalid e-mail address": "Invalid e-mail address",
    "Secondary e-mail": "Secondary e-mail",
    "Switch to": "Switch to",
    "Edit contact": "Edit contact",
    "logins": "logins",
    "Login count": "Login count",
    "Users": "Users"
});
					}]);