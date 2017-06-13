angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("en", 
					{
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "User"
}
				);
			}]);