angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Log": "Logboek",
    "Time": "Tijd",
    "Action": "Actie",
    "Record": "Record",
    "GO\\\\Core\\\\Users\\\\Model\\\\User": "Gebruiker",
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