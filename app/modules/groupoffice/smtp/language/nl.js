angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "E-mail adres",
    "Sender name": "Naam verzender",
    "Hostname": "Hostname",
    "Encryption": "Encryptie",
    "None": "Geen",
    "Port": "Poort"
}
				);
			}]);