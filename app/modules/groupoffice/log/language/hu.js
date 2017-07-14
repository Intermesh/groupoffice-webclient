angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "Log": "Napl\u00f3",
    "Time": "Id\u0151",
    "Action": "M\u0171velet",
    "Record": "Rekord",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "Felhaszn\u00e1l\u00f3"
}
				);
			}]);