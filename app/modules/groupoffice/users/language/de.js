angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "Edit contact": "Kontakt bearbeiten",
    "The passwords don't match": "Die Passw\u00f6rter sind nicht gleich",
    "GO\\Core\\Users\\Model\\User": "Der Benutzer",
    "GO\\Core\\Users\\Module": "Benutzer",
    "Users": "Die Benutzer",
    "No users found": "Keine Benutzer gefunden",
    "The password was incorrect": "Das Passwort ist nicht korrekt",
    "Current password": "Derzeitiges Passwort",
    "userLoggedIn": "Benutzer Log-in",
    "login": "Log-in",
    "Login count": "Log-in Z\u00e4hlung",
    "logins": "Log-ins",
    "New password": "Neues Passwort",
    "Invalid e-mail address": "Ung\u00fcltige E-Mail-Adresse",
    "Secondary e-mail": "Zweite E-Mail-Adresse",
    "Sorry, this username is already taken.": "Leider ist der Benutzername bereits vergeben.",
    "logout": "Abgemeldet",
    "Change password": "Passwort \u00e4ndern",
    "Switch to": "Wechseln zu"
}
				);
			}]);