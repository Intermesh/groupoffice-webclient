angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Send": "Verzenden",
    "None": "Geen",
    "Archive all incoming": "Archief alle binnengekomen items",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Incoming server": "Inkomende server",
    "Hostname": "Hostname",
    "Encryption": "Encryptie",
    "Port": "Poort",
    "Outgoing server": "Uitgaande server",
    "E-mail address": "E-mail adres",
    "Sender name": "Naam verzender",
    "Signatures": "Handtekeningen",
    "Invalid e-mail address": "Ongeldig e-mail adres"
}
				);
			}]);