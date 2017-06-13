angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "CardDAV Contactpersonen",
    "URL": "URL"
}
				);
			}]);