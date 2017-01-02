'use strict';

//for template caching gulp-ng-templatecache
angular.module('templates', []);
angular.module('GO.Core', 
	[
		'templates',
		'as.sortable',
		'ngMessages',
		'ngMaterial',
		'ngSanitize',
		'ui.router',
		'mdPickers',
		'flow' // https://github.com/flowjs/ng-flow
		
	]);