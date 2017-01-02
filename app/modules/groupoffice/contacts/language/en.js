angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("en",  {
							"GO\\Modules\\GroupOffice\\Contacts\\Module": 'Contacts',
							"GO\\Modules\\GroupOffice\\Contacts\\Model\\Contact":'Contact',
							"AgeFilter-min" : "Set minimum age",
							"AgeFilter-max" : "Set maximum age",
							"contactUpdate" : "was <strong>updated</strong> by {{creator.contact.name}} at {{createdAt | date:'short'}}",
							"contactCreate" : "was <strong>created</strong> by {{creator.contact.name}} at {{createdAt | date:'short'}}"
						});
					}]);
