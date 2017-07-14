angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "Log": "Journal",
    "Time": "Date",
    "Action": "Action",
    "Record": "Enregistrement",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "Utilisateur"
}
				);
			}]);