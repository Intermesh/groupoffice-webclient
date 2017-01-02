	angular.module('GO.Modules.GroupOffice.Contacts')
				.config(['GO.Core.Providers.TranslateProvider', function(TranslateProvider) {
						
						TranslateProvider.addTranslations('en', {
							'tag': 'Tags',
							'gender': 'Gender',
							'M': 'Male',
							'F': 'Female',
							'age': 'Age'
						});
					}]);