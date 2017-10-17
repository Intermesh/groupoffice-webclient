angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("hu", 
					{
    "Complete": "Teljes",
    "Incomplete": "Hi\u00e1nyos",
    "Late": "K\u00e9s\u0151i",
    "My tasks": "Saj\u00e1t feladatok",
    "Created for others": "L\u00e9trehozva m\u00e1sok sz\u00e1m\u00e1ra",
    "No tasks found": "Nem tal\u00e1lhat\u00f3 feladat",
    "Desciption": "Le\u00edr\u00e1s",
    "Due at": "Esed\u00e9kes:",
    "Duration (Minutes)": "Id\u0151tartam (perc)",
    "Assigned to": "Hozz\u00e1rendelve:",
    "Incomplete tasks": "Hi\u00e1nyos feladatok",
    "More": "T\u00f6bb",
    "Completed on": "Befejez\u00e9s d\u00e1tuma",
    "Not yet completed": "M\u00e9g nincs befejezve",
    "Due time": "Esed\u00e9kess\u00e9g ideje",
    "minutes": "perc",
    "Duration": "Id\u0151tartam",
    "Completed at": "Befejez\u00e9s ideje",
    "Address Country": "C\u00edm (orsz\u00e1g)",
    "Debtor terms": "K\u00f6telezett felt\u00e9telei",
    "Query": "K\u00e9rd\u00e9s",
    "Tasks": "Feladatok",
    "All statuses": "All statuses",
    "All assignees": "All assignees",
    "Unassigned": "Unassigned",
    "Clear": "Clear"
}
				);
			}]);