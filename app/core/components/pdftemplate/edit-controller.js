'use strict';

GO.module('GO.Core').controller('GO.Core.Components.PdfTemplate.EditController', [
	'$scope',
	'read', // You can inject the 'read' promise. This is resolved when the passed 'editModel' is done with it's read request to the server.
	'GO.Core.Languages',
	'GO.Core.Services.ServerAPI',
	function ($scope, read, Languages, ServerAPI) {

		$scope.languages = Languages;
		
		$scope.preview = function() {
			$scope.model.save().then(function() {
				window.open(ServerAPI.url('templates/pdf/'+encodeURIComponent($scope.model.$moduleClassName)+'/'+$scope.model.id+'/preview'));
			});
		};

	}]);