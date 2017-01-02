'use strict';

GO.module('GO.Core').controller('GO.Core.Components.PdfTemplate.EditController', [
	'$scope',
	'read', // You can inject the 'read' promise. This is resolved when the passed 'editModel' is done with it's read request to the server.
	'GO.Core.Languages',
	'$http',
	function ($scope, read, Languages, $http) {

		$scope.languages = Languages;

	}]);