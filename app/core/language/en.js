angular.module("GO.Core").config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {

		TranslateProvider.addTranslations("en", {
			
			"create": "Create",
			"update": "Update",
			"read": "Read",
			"delete": "Delete",
			
			"GO\\Core\\Cron\\Model\\Job" : "System task"
		});
	}
]);
