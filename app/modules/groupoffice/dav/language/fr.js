angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "Personnes de contact CardDAV ",
    "URL": "URL"
}
				);
			}]);