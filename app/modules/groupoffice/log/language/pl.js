angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "Log": "Rejestr",
    "Time": "Czas",
    "Action": "Czynno\u015b\u0107",
    "Record": "Record",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "U\u017cytkownik"
}
				);
			}]);