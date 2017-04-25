angular.module("GO.Core")
				.config(["GO.Core.Providers.TranslateProvider", function (TranslateProvider) {
						TranslateProvider.addTranslations("en",  {
							"GO\\Modules\\GroupOffice\\Dav\\Model\\Account": 'CardDAV Contacts'
							
							
						});
					}]);

