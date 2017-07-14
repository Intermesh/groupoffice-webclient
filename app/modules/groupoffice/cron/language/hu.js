angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "Scheduled task": "\u00dctemezett feladat",
    "Class name": "Oszt\u00e1ly neve",
    "The class does not exist": "Az oszt\u00e1ly nem l\u00e9tezik",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "Az oszt\u00e1ly neve \u00e9rv\u00e9nytelen. Nem terjeszti ki a k\u00f6vetkez\u0151t: IFW\\Data\\Object",
    "Method": "M\u00f3dszer",
    "The method does not exist": "A m\u00f3dszer nem l\u00e9tezik",
    "Expression": "Kifejez\u00e9s",
    "Not a valid CRON expression": "\u00c9rv\u00e9nytelen CRON kifejez\u00e9s",
    "Time zone": "Id\u0151z\u00f3na",
    "Not a valid time zone": "\u00c9rv\u00e9nytelen id\u0151z\u00f3na",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Megjegyz\u00e9s: A kifejez\u00e9s UTC id\u0151z\u00f3n\u00e1ban ker\u00fcl kisz\u00e1m\u00edt\u00e1sra; vegye figyelembe a saj\u00e1t id\u0151z\u00f3n\u00e1j\u00e1t",
    "Scheduled tasks": "\u00dctemezett feladatok",
    "Running": "Fut",
    "Run now": "Futtassa most",
    "No scheduled tasks": "Nincsenek \u00fctemezett feladatok"
}
				);
			}]);