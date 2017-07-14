angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "Log": "Log",
    "Time": "Timp",
    "Action": "Ac\u0163iune",
    "Record": "\u00cenregistrare",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "Utilizator"
}
				);
			}]);