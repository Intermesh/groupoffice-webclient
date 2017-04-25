angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "Action": "Aktion",
    "GO\\\\Core\\\\Modules\\\\Users\\\\Model\\\\User": "GO\\\\Core\\\\Modules\\\\Users\\\\Model\\\\User",
    "Log": "Logbuch",
    "Record": "Aufnahme",
    "Time": "Zeit"
}
				);
			}]);