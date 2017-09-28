angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "GO\\Core\\Users\\Model\\User": "Gebruiker",
    "GO\\Core\\Users\\Module": "Gebruikers",
    "userLoggedIn": "ingelogd",
    "login": "Inloggen",
    "logout": "Uitloggen",
    "Change password": "Wachtwoord veranderen",
    "No users found": "Geen gebruikers gevonden",
    "Current password": "Huidige wachtwoord",
    "The password was incorrect": "Het wachtwoord was onjuist",
    "New password": "Nieuw wachtwoord",
    "The passwords don't match": "De wachtwoorden zijn niet gelijk",
    "Sorry, this username is already taken.": "Sorry, deze gebruikersnaam is al in gebruik.",
    "Invalid e-mail address": "Ongeldig e-mail adres",
    "Secondary e-mail": "Secundair e-mail adres",
    "Switch to": "Wissel naar",
    "Edit contact": "Bewerk contact",
    "logins": "logins",
    "Login count": "Login telling",
    "Users": "Gebruikers",
    "Clear": "Clear"
}
				);
			}]);