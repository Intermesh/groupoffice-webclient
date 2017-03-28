angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "E-mail address",
    "Sender name": "Sender name",
    "Hostname": "Hostname",
    "Encryption": "Encryption",
    "None": "None",
    "Port": "Port"
}
				);
			}]);