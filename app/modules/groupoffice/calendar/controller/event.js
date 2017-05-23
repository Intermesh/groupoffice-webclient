'use strict';

GO.module('GO.Modules.GroupOffice.Calendar').
	controller('GO.Modules.GroupOffice.Calendar.Event', [
		'$scope',
		'$stateParams',
		'GO.Core.Services.ServerAPI',
		function ($scope, $stateParams, ServerAPI) {
			$scope.color = GO.Calendar.util.color;
			$scope.$parent.$parent.model.readIf({'eventId':$stateParams.eventId,'calendarId':$stateParams.calendarId} );
			$scope.classFor = function(event) {
				var cls = [event.event.tag];
				if(event.responseStatus == 1) {
					cls.push('new');
				}
				return cls;
			};
			$scope.attachmentDownload = function(blobId) {
				console.log('mopmop.... '+blobId);
				ServerAPI.download(blobId);
			};
			$scope.attachmentThumb = function(blobId) {
				return ServerAPI.thumbUrl(blobId, {w:132, h:88});
			};
		}
	]);