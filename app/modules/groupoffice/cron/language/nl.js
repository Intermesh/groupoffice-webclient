angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Scheduled task": "Geplande taak",
    "Class name": "Klasse naam",
    "The class does not exist": "De klasse naam bestaat niet",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "The klasse naam is ongeldig. Het breidt IFW\\Data\\Object niet uit",
    "Method": "Methode",
    "The method does not exist": "De methode bestaat niet",
    "Expression": "Expressie",
    "Not a valid CRON expression": "Geen geldige CRON expressie",
    "Time zone": "Tijd zone",
    "Not a valid time zone": "Geen geldige tijd zone",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Opmerking: De expressie is berekend in UTC tijd. Overweeg de tijdzone.",
    "Scheduled tasks": "Geplande taken",
    "Running": "Bezig",
    "Run now": "Voer nu uit",
    "No scheduled tasks": "Geen geplande taken",
    "Close": "Close",
    "Save": "Save",
    "Name": "Name",
    "This field is required": "This field is required",
    "Add": "Add"
}
				);
			}]);