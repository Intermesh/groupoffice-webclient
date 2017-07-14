angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "Scheduled task": "Sarcin\u0103 planificat\u0103",
    "Class name": "Nume clas\u0103",
    "The class does not exist": "Clasa nu exist\u0103",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "Numele de clas\u0103 nu este valid. Nu se extinde IFW\\Dat\u0103\\Obiect",
    "Method": "Metoda",
    "The method does not exist": "Metoda nu exist\u0103",
    "Expression": "Expresia",
    "Not a valid CRON expression": "Nu este o expresie CRON valid\u0103",
    "Time zone": "Fusul orar",
    "Not a valid time zone": "Nu este un fus orar valabil",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Not\u0103: Expresia este calculat\u0103 \u00een timp UTC, a\u015fa c\u0103 v\u0103 rug\u0103m s\u0103 ave\u0163i \u00een vedere fusul dvs. orar",
    "Scheduled tasks": "Sarcini planificate",
    "Running": "Rulare",
    "Run now": "Rukleaz\u0103 acum",
    "No scheduled tasks": "Nicio sarcin\u0103 planificat\u0103"
}
				);
			}]);