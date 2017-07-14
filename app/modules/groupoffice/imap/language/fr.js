angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "Send": "Envoyer",
    "None": "Aucun",
    "Archive all incoming": "Archiver tous les \u00e9l\u00e9ments entrants",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Incoming server": "Serveur entrant",
    "Hostname": "Nom du Host",
    "Encryption": "Encodage",
    "Port": "Port",
    "Outgoing server": "Serveur sortant",
    "E-mail address": "Adresse e-mail",
    "Sender name": "Nom de l'exp\u00e9diteur",
    "Signatures": "Signatures",
    "Invalid e-mail address": "Adresse e-mail non valide ",
    "Could not connect to server": "Impossible de se connecter au serveur",
    "SMTP account": "Compte SMTP"
}
				);
			}]);