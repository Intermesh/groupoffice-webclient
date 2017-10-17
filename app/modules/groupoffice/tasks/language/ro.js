angular.module("GO.Core")
		.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
				TranslateProvider.addTranslations("ro", 
					{
    "Complete": "Complet",
    "Incomplete": "Incomplet",
    "Late": "\u00cent\u00e2rziat",
    "My tasks": "Sarcinile mele",
    "Created for others": "Creat pentru al\u021bii",
    "No tasks found": "Nicio sarcin\u0103 g\u0103sit\u0103",
    "Desciption": "Descriere",
    "Due at": "Scadent la",
    "Duration (Minutes)": "Durata (minute)",
    "Assigned to": "Alocat c\u0103tre",
    "Incomplete tasks": "Sarcini incomplete",
    "More": "Mai mult",
    "Completed on": "Completat la",
    "Not yet completed": "\u00cenc\u0103 necompletat",
    "Due time": "Timp scadent",
    "minutes": "minute",
    "Duration": "Durata",
    "Completed at": "Completat la",
    "Address Country": "\u021aara adresei",
    "Debtor terms": "Termeni debitor",
    "Query": "\u00centrebare",
    "Tasks": "Sarcini",
    "All statuses": "All statuses",
    "All assignees": "All assignees",
    "Unassigned": "Unassigned",
    "Clear": "Clear"
}
				);
			}]);