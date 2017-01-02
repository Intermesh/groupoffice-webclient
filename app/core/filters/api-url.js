
/**
 * @ngdoc filter
 * @name GO.Core.Filters.age
 *
 * @description
 * Shows the age in years
 *
 * @param {string} date Date to calculate age for
 * @returns {int} Age in years
 */

angular.module('GO.Core').filter('apiUrl', [
	'GO.Core.Services.ServerAPI',
	function (ServerAPI) {
		return function (route, params) {
			
			return ServerAPI.url(route, params);
		};
	}]);