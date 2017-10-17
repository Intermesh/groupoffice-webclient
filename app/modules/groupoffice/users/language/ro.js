angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "GO\\Core\\Users\\Model\\User": "Utilizator",
    "GO\\Core\\Users\\Module": "Utilizatori",
    "userLoggedIn": "userLoggedIn",
    "login": "autentificare",
    "logout": "delogare",
    "Change password": "Modificare parol\u0103",
    "No users found": "Niiciun utilizator g\u0103sit",
    "Current password": "Parola actual\u0103",
    "The password was incorrect": "Parola a fost incorect\u0103",
    "New password": "Parol\u0103 nou\u0103",
    "The passwords don't match": "Parola nu se potrive\u015fte",
    "Sorry, this username is already taken.": "Ne pare r\u0103u, acest nume de utilizator este deja ocupat.",
    "Invalid e-mail address": "Adres\u0103 de e-mail nevalabil\u0103",
    "Secondary e-mail": "Adres\u0103 de e-mail secundar\u0103",
    "Switch to": "Comuta\u0163i la",
    "Edit contact": "Edita\u0163i contactul",
    "logins": "autentific\u0103ri",
    "Login count": "Num\u0103r autentific\u0103ri",
    "Users": "Utilizatori",
    "Clear": "Clear",
    "Display name": "Display name"
}
				);
			}]);