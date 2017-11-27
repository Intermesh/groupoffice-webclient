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
    "Invalid e-mail address": "Ongeldig e-mail adres",
    "Could not connect to server": "Could not connect to server",
    "SMTP account": "SMTP account",
    "Authentication failed": "Authentication failed",
    "Close": "Close",
    "Attach file": "Attach file",
    "Subject": "Subject",
    "More options": "More options",
    "Save": "Save",
    "This field is required": "This field is required",
    "E-mail": "E-mail",
    "Password": "Password",
    "Username": "Username",
    "Name": "Name"
}
				);
			}]);