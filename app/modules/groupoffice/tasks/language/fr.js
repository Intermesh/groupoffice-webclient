angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("fr", 
					{
    "Complete": "Complet",
    "Incomplete": "Incomplet",
    "Late": "Retard\u00e9",
    "My tasks": "Mes t\u00e2ches",
    "Created for others": "Cr\u00e9\u00e9 pour d'autres",
    "No tasks found": "Pas trouv\u00e9 de t\u00e2ches",
    "Desciption": "Description",
    "Due at": "Termin\u00e9 le ",
    "Duration (Minutes)": "Dur\u00e9e (Minutes)",
    "Assigned to": "Attribu\u00e9 \u00e0 ",
    "Incomplete tasks": "T\u00e2ches incompl\u00e8tes",
    "More": "Plus",
    "Completed on": "Termin\u00e9 le ",
    "Not yet completed": "Pas encore termin\u00e9",
    "Due time": "En temps voulu ",
    "minutes": "Minutes",
    "Duration": "Dur\u00e9e",
    "Completed at": "Termin\u00e9 le ",
    "Address Country": "Adresse Pays ",
    "Debtor terms": "Conditions d\u00e9biteurs",
    "Query": "Question",
    "Tasks": "T\u00e2ches",
    "All statuses": "All statuses",
    "All assignees": "All assignees",
    "Unassigned": "Unassigned",
    "Clear": "Clear"
}
				);
			}]);