angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "E-mail address": "E-Mail-Adresse",
    "Encryption": "Verschl\u00fcsselung",
    "None": "Kein",
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "Hostname": "Hostname",
    "Sender name": "Name Absender",
    "Port": "Tor",
    "Close": "Close",
    "Save": "Save",
    "Username": "Username",
    "Password": "Password"
}
				);
			}]);