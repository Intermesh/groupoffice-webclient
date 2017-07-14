angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "Adres e-mail",
    "Sender name": "Nazwa nadawcy",
    "Hostname": "Nazwa hosta",
    "Encryption": "Szyfrowanie",
    "None": "Brak",
    "Port": "Brama"
}
				);
			}]);