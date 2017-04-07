angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("nl", 
					{
    "Complete": "Compleet",
    "Incomplete": "Incompleet",
    "Late": "Laat",
    "My tasks": "Mijn taken",
    "Created for others": "Gecre\u00eberd voor anderen",
    "No tasks found": "Geen taken gevonden",
    "Desciption": "Omschrijving",
    "Due at": "Klaar op",
    "Duration (Minutes)": "Duur (Minuten)",
    "Assigned to": "Toegewezen aan",
    "Incomplete tasks": "Incomplete taken",
    "More": "Meer",
    "Completed on": "Afgerond op",
    "Not yet completed": "Nog niet afgerond",
    "Due time": "Due time",
    "minutes": "minuten",
    "Duration": "Duur",
    "Completed at": "Afgerond op",
    "Address Country": "Adres Land",
    "Debtor terms": "Debiteur condities",
    "Query": "Vraag",
    "Tasks": "Taak"
}
				);
			}]);