angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("en", {
							"GO\\Modules\\GroupOffice\\Tasks\\Module": 'Tasks',
							"GO\\Modules\\GroupOffice\\Tasks\\Model\\Account" : "GroupOffice tasks",
							"TASK_STATUS_FINISHED": 'Finished',
							"TASK_STATUS_UNFINISHED": 'Unfinished'
						});
					}]);