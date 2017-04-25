angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("de", 
					{
    "Running": "Im Einsatz",
    "The class does not exist": "Die Klasse besteht nicht",
    "The method does not exist": "Die Methode besteht nicht",
    "Expression": "Expression",
    "Not a valid CRON expression": "Keine g\u00fcltige CRON Expression",
    "Not a valid time zone": "Keine g\u00fcltige Zeitzone",
    "No scheduled tasks": "Keine geplanten Aufgaben",
    "Scheduled task": "Geplante Aufgabe",
    "Scheduled tasks": "Geplante Aufgaben",
    "Class name": "Klassenname",
    "Method": "Methode",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Bemerkung: die Expression ist in UTC-Zeit berechnet. Ber\u00fccksichtigen Sie Ihre Zeitzone",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "Der Klassenname ist ung\u00fcltig. Er erweitert IFW \\ Daten \\ Objekt nicht",
    "Time zone": "Zeitzone",
    "Run now": "Jetzt ausf\u00fchren"
}
				);
			}]);