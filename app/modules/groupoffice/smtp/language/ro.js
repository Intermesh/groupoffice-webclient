angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "Adres\u0103 de e-mail",
    "Sender name": "Nume expeditor",
    "Hostname": "Nume host",
    "Encryption": "Criptare",
    "None": "Niciunul",
    "Port": "Port"
}
				);
			}]);