angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "GO\\Modules\\GroupOffice\\Dav\\Model\\Account": "CardDAV Contactpersonen",
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