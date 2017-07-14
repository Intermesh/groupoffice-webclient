angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("pl", 
					{
    "Complete": "Kompletny",
    "Incomplete": "Niekompletny",
    "Late": "P\u00f3\u017ano",
    "My tasks": "Moje zadania",
    "Created for others": "Utworzone przez innych",
    "No tasks found": "Nie znaleziono zada\u0144",
    "Desciption": "Opis",
    "Due at": "Gotowe dnia",
    "Duration (Minutes)": "Czas trwania (minuty)",
    "Assigned to": "Przydzielone do",
    "Incomplete tasks": "Niekompletne zadania",
    "More": "Wi\u0119cej",
    "Completed on": "Zako\u0144czono dnia",
    "Not yet completed": "Jeszcze nie zako\u0144czono",
    "Due time": "Due time",
    "minutes": "Minuty",
    "Duration": "Czas trwania",
    "Completed at": "Zako\u0144czono dnia",
    "Address Country": "Kraj adresu",
    "Debtor terms": "Warunki d\u0142u\u017cnika",
    "Query": "Pytanie",
    "Tasks": "Zadanie"
}
				);
			}]);