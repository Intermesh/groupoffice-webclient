/**
 * @ngdoc filter
 * @name GO.Core.Providers.Translate.{goT
 *
 * @description
 * Translates a string into the configured language
 *
 * @param {string} text Text to translate
 * @returns {string} Translated text.
 *
 *
 * @example
 *{{::"Save" | goT}}
 */

angular.module('GO.Core')
				.filter('goT', ['GO.Core.Providers.Translate',function(Translate) {
						return function(key, vars) {
							return Translate.t(key, vars);
						};
					}]);

