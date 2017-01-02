angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("en", {
							"GO\\Modules\\GroupOffice\\Tasks\\Module": 'Tasks',
							"TASK_STATUS_FINISHED": 'Finished',
							"TASK_STATUS_UNFINISHED": 'Unfinished'
						});
					}]);