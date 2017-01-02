/**
 * @ngdoc filter
 * @name GO.Core.Filters.boolean
 *
 * @description
 * Translates a boolean into "Yes" or "No"
 *
 * @param {boolean} boolean Boolean to filter
 * @returns {string} Translated text "Yes" or "No".
 */
angular.module('GO.Core')
		.filter('boolean', ['GO.Core.Providers.Translate', function(Translate) {
			return function(boolean) {
						return boolean ? Translate.t('Yes') : Translate.t('No');
			};
		}]);
