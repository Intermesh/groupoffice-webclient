angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "GO\\Core\\Users\\Model\\User": "U\u017cytkownik",
    "GO\\Core\\Users\\Module": "U\u017cytkownicy",
    "userLoggedIn": "zalogowano",
    "login": "Logowanie",
    "logout": "Wyloguj",
    "Change password": "Zmie\u0144 has\u0142o",
    "No users found": "Nie znaleziono u\u017cytkownik\u00f3w",
    "Current password": "Aktualne has\u0142o",
    "The password was incorrect": "Has\u0142o by\u0142o nieprawid\u0142owe",
    "New password": "Nowe has\u0142o",
    "The passwords don't match": "Has\u0142a nie s\u0105 takie same",
    "Sorry, this username is already taken.": "Przepraszamy, ta nazwa u\u017cytkownika jest ju\u017c u\u017cywana.",
    "Invalid e-mail address": "Nieprawid\u0142owy adres e-mail",
    "Secondary e-mail": "Pomocniczy adres e-mail",
    "Switch to": "Zmie\u0144 na",
    "Edit contact": "Edytuj kontakt",
    "logins": "logowania",
    "Login count": "Licznik logowa\u0144",
    "Users": "U\u017cytkownicy",
    "Clear": "Clear",
    "Display name": "Display name"
}
				);
			}]);