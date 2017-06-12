angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "Action": "Aktion",
    "GO\\\\Core\\\\Modules\\\\Users\\\\Model\\\\User": "Benutzer",
    "Log": "Logbuch",
    "Record": "Aufnahme",
    "Time": "Zeit"
}
				);
			}]);