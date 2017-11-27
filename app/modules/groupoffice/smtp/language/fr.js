angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "Adresse e-mail",
    "Sender name": "Nom de l'exp\u00e9diteur",
    "Hostname": "Nom du Host",
    "Encryption": "Encodage",
    "None": "Aucun",
    "Port": "Port",
    "Close": "Close",
    "Save": "Save",
    "Username": "Username",
    "Password": "Password"
}
				);
			}]);