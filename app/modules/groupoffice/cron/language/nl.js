angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Scheduled task": "Geplande taak",
    "Class name": "Class name",
    "The class does not exist": "The class does not exist",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "The class name is invalid. It does not extend IFW\\Data\\Object",
    "Method": "Method",
    "The method does not exist": "The method does not exist",
    "Expression": "Expression",
    "Not a valid CRON expression": "Not a valid CRON expression",
    "Time zone": "Time zone",
    "Not a valid time zone": "Not a valid time zone",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Note: The expression is calculated in UTC time so please consider your timezone",
    "Scheduled tasks": "Geplande taken",
    "Running": "Bezig",
    "Run now": "Voer nu uit",
    "No scheduled tasks": "No scheduled tasks"
}
				);
			}]);