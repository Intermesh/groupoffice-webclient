
/**
 * @ngdoc filter
 * @name GO.Core.Filters.encodeURIComponent
 *
 * @description
 * Encodes an URI component
 *
 * @param {string} URI component
 * @returns {string} Encoded URI component
 */
angular.module('GO.Core').filter('encodeURIComponent',['$window',function($window) {  
		return $window.encodeURIComponent;
  }]);