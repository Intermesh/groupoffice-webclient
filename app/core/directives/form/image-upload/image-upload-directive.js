'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goImageUpload
 * 
 * @param {string} onChange Function to call on change. It's called with the server file. {file: 'example.jpg'}.
 * @param {string} ngModel Assignable angular expression to data-bind to.
 * @param {expression} goReadOnly
 * @param {expression} goDeletePermission
 * @param {int} thumbWidth
 * @param {int} thumbHeight
 * 
 * @example
 * 
 * <md-input-container>
 *		<div class="go-image-upload" go-image-upload ng-model="contact.photo" thumb-width="80" thumb-height="80"></div>
 * </md-input-container>
 */

angular.module('GO.Core').directive('goImageUpload', [
	'GO.Core.Services.ServerAPI',
	function (ServerAPI) {
		return {
			restrict: 'A',
			scope: {
				onChange: '&?',
				goModel: '=ngModel',
				goReadOnly: '=?',
				goDeletePermission: '=?',
				goDefaultUrl: '@?',
				thumbWidth: '@',
				thumbHeight: '@'
			},
			//replace:true,

			controller: ['$scope', '$element', '$attrs', '$transclude', 'GO.Core.Services.ServerAPI', function ($scope, $element, $attrs, $transclude, ServerAPI) {
					$scope.flowInit = ServerAPI.getFlowInit({singleFile: true});
				}],
			link: function (scope, element, attrs) {

				element.addClass('go-image-upload');

				scope.XSRFToken = ServerAPI.getXSRFToken();

				scope.uploadSuccess = function ($file, $message) {
					var data = angular.fromJson($message);

//					scope.url = ServerAPI.url('thumb/' + data.data.blobId, {dummy: "1"}); //dummy param so we can add params in view easily

					scope.goModel = data.data;
					

					if (scope.onChange) {
						scope.onChange({data: data.data, goModel: scope.goModel});
					}

				};

				scope.remove = function () {
					scope.goModel = null;
					scope.url = null;
				};
				
				scope.$watch('goModel', function(blob) {
				
					if(scope.goDefaultUrl && scope.goDefaultUrl.indexOf('?') === -1) {
						scope.goDefaultUrl += '?dummy=1';
					}
				
					scope.url = blob && blob.blobId ? ServerAPI.url('thumb/' + blob.blobId, {dummy: "1"}) : scope.goDefaultUrl; //dummy param so we can add params in view easily
				});

			},
			templateUrl: 'core/directives/form/image-upload/image-upload.html'
		};
	}]);
