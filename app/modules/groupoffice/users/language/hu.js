angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "GO\\Core\\Users\\Model\\User": "Felhaszn\u00e1l\u00f3",
    "GO\\Core\\Users\\Module": "Felhaszn\u00e1l\u00f3k",
    "userLoggedIn": "felhaszn\u00e1l\u00f3Bejelentkezve",
    "login": "bejelentkez\u00e9s",
    "logout": "kijelentkez\u00e9s",
    "Change password": "Jelsz\u00f3 m\u00f3dos\u00edt\u00e1sa",
    "No users found": "Nem tal\u00e1lhat\u00f3k felhaszn\u00e1l\u00f3k",
    "Current password": "Jelenlegi jelsz\u00f3",
    "The password was incorrect": "A jelsz\u00f3 hib\u00e1s volt",
    "New password": "\u00daj jelsz\u00f3",
    "The passwords don't match": "A jelsz\u00f3k nem egyeznek",
    "Sorry, this username is already taken.": "Ez a felhaszn\u00e1l\u00f3n\u00e9v sajnos foglalt.",
    "Invalid e-mail address": "\u00c9rv\u00e9nytelen e-mail c\u00edm.",
    "Secondary e-mail": "M\u00e1sodlagos e-mail",
    "Switch to": "V\u00e1lt\u00e1s erre:",
    "Edit contact": "Kapcsolattart\u00f3 szerkeszt\u00e9se",
    "logins": "bejelentkez\u00e9s",
    "Login count": "Bejelentkez\u00e9s-sz\u00e1ml\u00e1l\u00f3",
    "Users": "Felhaszn\u00e1l\u00f3k",
    "Clear": "Clear",
    "Display name": "Display name"
}
				);
			}]);