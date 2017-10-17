angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "GO\\Core\\Users\\Model\\User": "Utilisateur",
    "GO\\Core\\Users\\Module": "Utilisateurs",
    "userLoggedIn": "utilisateur connect\u00e9",
    "login": "Connexion",
    "logout": "D\u00e9connexion",
    "Change password": "Changer mot de passe",
    "No users found": "Pas trouv\u00e9 d'utilisateurs",
    "Current password": "Mot de passe actuel",
    "The password was incorrect": "Mot de passe incorrect",
    "New password": "Nouveau mot de passe",
    "The passwords don't match": "Les mots de passe ne correspondent pas",
    "Sorry, this username is already taken.": "D\u00e9sol\u00e9, mais ce nom d'utilisateur est d\u00e9j\u00e0 utilis\u00e9.",
    "Invalid e-mail address": "Adresse e-mail non valide ",
    "Secondary e-mail": "Adresse e-mail secondaire",
    "Switch to": "Basculer sur ",
    "Edit contact": "Modifier contact",
    "logins": "Connexions",
    "Login count": "Nombre de connexions",
    "Users": "Utilisateurs",
    "Clear": "Clear",
    "Display name": "Display name"
}
				);
			}]);