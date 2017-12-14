angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "CardDAV Kontakte",
    "URL": "URL"

}
				);
			}]);