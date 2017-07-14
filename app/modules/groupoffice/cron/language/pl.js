angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "Scheduled task": "Zaplanowane zadanie",
    "Class name": "Nazwa klasy",
    "The class does not exist": "Nazwa klasy nie istnieje",
    "The class name is invalid. It does not extend IFW\\Data\\Object": "Nazwa klasy jest nieprawid\u0142owa. Nie powoduje ona rozszerzenia IFW\\Data\\Object",
    "Method": "Metoda czyszczenia",
    "The method does not exist": "Metoda nie istnieje",
    "Expression": "Wyra\u017cenie",
    "Not a valid CRON expression": "Brak wa\u017cnego wyra\u017cenia CRON",
    "Time zone": "Strefa czasowa",
    "Not a valid time zone": "Brak wa\u017cnej strefy czasowej",
    "Note: The expression is calculated in UTC time so please consider your timezone": "Uwaga: Wyra\u017cenie jest obliczane w postaci czasu UTC. Przemy\u015bl stref\u0119 czasow\u0105.",
    "Scheduled tasks": "Zaplanowane zadania",
    "Running": "Zaj\u0119ty",
    "Run now": "Wykonaj teraz",
    "No scheduled tasks": "Brak zaplanowanych zada\u0144"
}
				);
			}]);