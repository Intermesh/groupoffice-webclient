'use strict';

GO.module('GO.Modules.GroupOffice.Calendar').
	controller('GO.Modules.GroupOffice.Calendar.Event', [
		'$scope',
		'$stateParams',
		'GO.Core.Services.ServerAPI',
		function ($scope, $stateParams, ServerAPI) {
			$scope.color = GO.Calendar.util.color;
			$scope.$parent.$parent.model.readIf({'eventId':$stateParams.id,'userId':$stateParams.userId} );

			$scope.attachmentDownload = function(blobId) {
				console.log('mopmop.... '+blobId);
				ServerAPI.download(blobId);
			};
			$scope.attachmentThumb = function(blobId) {
				return ServerAPI.thumbUrl(blobId, {w:132, h:88});
			};
		}
	]);