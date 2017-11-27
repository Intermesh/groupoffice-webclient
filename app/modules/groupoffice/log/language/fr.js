angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "Log": "Journal",
    "Time": "Date",
    "Action": "Action",
    "Record": "Enregistrement",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "Utilisateur",
    "All years": "All years",
    "All months": "All months",
    "January": "January",
    "February": "February",
    "March": "March",
    "April": "April",
    "May": "May",
    "June": "June",
    "July": "July",
    "August": "August",
    "September": "September",
    "October": "October",
    "November": "November",
    "December": "December",
    "Type": "Type",
    "Description": "Description",
    "Open side navigation": "Open side navigation"
}
				);
			}]);