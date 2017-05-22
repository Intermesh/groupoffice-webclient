/**
 * @ngdoc service
 * @name GO.Core.Providers.Translate.Translate
 *
 * @description
 * Translate text with this service and provider
 *
 *
 * @example
 <div ng-controller="TranslateController">
 <p>Try the translate service...</p>
 <button ng-click="translate('Yes');">Translate 'Yes' into Dutch.</button>
 <button ng-click="translate('No');">Translate 'No' into Dutch.</button>
 
 
 <p>You can also use a filter:<br /><br />
 
 Yes in Dutch is: {{::"Yes" | goT}}</p>
 
 <p>And use variables:</p>
 {{::"Are you sure you want to delete '{item}'? | goT : {item: "foo"} }}
 </div>
 
 * @example
 
 
 angular.module('myTranslatedModule', ["GO"])
 .config(['TranslateProvider', function(TranslateProvider) {
 TranslateProvider.setLanguage('nl');
 
 TranslateProvider.addTranslations('nl', {
 'Yes': 'Ja',
 'No': 'Nee'
 });
 }])
 .controller('TranslateController', ['$scope', 'GO.Core.Providers.Translate', function($scope, Translate) {
 $scope.translate = function(msg) {
 alert(Translate.t(msg));
 };
 }]);
 
 */
angular.module('GO.Core').provider('GO.Core.Providers.Translate', [
	function TranslateProvider() {

		var translations = {};




		var language = 'nl';

		this.setLanguage = function (lang) {
			console.log("setLanguage("+lang+")");
			language = lang;
		};

		this.addTranslations = function (lang, newTranslations) {

			if (!translations[lang])
				translations[lang] = {};
			
			for (var key in newTranslations) {
//				if (translations[lang][key]) {
//					console.warn(lang + " translation for " + key + " is already defined");
//				}

				translations[lang][key] = newTranslations[key];
			}


		};

		this.$get = ['$interpolate', 'GO.Core.Services.ServerAPI', function ($interpolate, ServerAPI) {

				return {
					language: language,
					translations: translations,
					setLanguage: function (lang) {						
						this.language = ServerAPI.headers['Accept-Language'] =  lang.toLowerCase();
					},
					/**
					 * @ngdoc method
					 * @name GO.Translate#t
					 * @methodOf GO.Translate
					 * @description
					 * Translates a string into the configured language
					 *
					 * @param {string} text Text to translate
					 * @returns {string} Translated text.
					 */

					t: function (text, vars) {

						var translated;
						if (!this.translations[this.language] || !this.translations[this.language][text]) {
							translated = this.fallbackLanguage(text);
						} else
						{
							translated = this.translations[this.language][text];
						}

						if (vars) {
							//replace single brackets to double. We can't use double brackets inside a template variable with a filter.
							translated = translated.replace(/\{([^\}]+)\}/g, '{{$1}}');

							var getter = $interpolate(translated);
							return getter(vars);
						}

						return translated;

					},
					fallbackLanguage: function (text) {
						if (!this.translations["en"] || !this.translations["en"][text]) {
							return text;
						}
						return this.translations["en"][text];
					}
				};
			}];
	}]).run(['GO.Core.Providers.Translate', 'GO.Config', function(Translate,Config){
		
		
		if(Config.language) {
			Translate.setLanguage(Config.language);
			return;
		}
		
		var browserLang;
		
		if(navigator.languages) {
			browserLang = navigator.languages[0];
		}else
		{
			browserLang = navigator.userLanguage || navigator.language;
		}
		
		browserLang = browserLang.toLowerCase();

		if(Translate.translations[browserLang]) {
			Translate.setLanguage(browserLang);
			return;
		}
		
		var parts = browserLang.split('-');

		
		if(Translate.translations[parts[0]]) {
			Translate.setLanguage(parts[0]);
			return;
		}
					
	}]);

