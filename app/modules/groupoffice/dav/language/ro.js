angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "Persoan\u0103 de contact CardDav",
    "URL": "URL"
}
				);
			}]);