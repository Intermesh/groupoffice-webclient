angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "CardDAV Kapcsolattart\u00f3\n",
    "URL": "URL"
}
				);
			}]);