angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "Personnes de contact CardDAV ",
    "URL": "URL",
    "Close": "Close",
    "Save": "Save",
    "Name": "Name",
    "This field is required": "This field is required",
    "Username": "Username",
    "Password": "Password",
    "Share": "Share"
}
				);
			}]);