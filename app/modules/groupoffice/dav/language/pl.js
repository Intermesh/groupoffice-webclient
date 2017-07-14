angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "Osoby do kontaktu CardDAV",
    "URL": "URL"
}
				);
			}]);