angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "GO\\\\Core\\\\Smtp\\\\Model\\\\Account": "GO\\\\Core\\\\Smtp\\\\Model\\\\Account",
    "E-mail address": "E-mail c\u00edm",
    "Sender name": "K\u00fcld\u0151 neve",
    "Hostname": "Hostn\u00e9v",
    "Encryption": "Titkos\u00edt\u00e1s",
    "None": "Nincs",
    "Port": "Port"
}
				);
			}]);