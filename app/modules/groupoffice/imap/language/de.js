angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "Archive all incoming": "Alle eingehenden Items archivieren",
    "createImapAccountText": "createImapAccountText",
    "E-mail address": "E-Mail-Adresse",
    "Encryption": "Verschl\u00fcsselung",
    "None": "Kein",
    "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account": "GO\\\\Modules\\\\GroupOffice\\\\Imap\\\\Model\\\\Account",
    "Signatures": "Unterschrift",
    "Hostname": "Hostname",
    "Incoming server": "Eingangsserver",
    "Sender name": "Name Absender",
    "Invalid e-mail address": "Ung\u00fcltige E-Mail-Adresse",
    "Port": "Tor",
    "Outgoing server": "Ausgangsserver",
    "Send": "Versenden"
}
				);
			}]);