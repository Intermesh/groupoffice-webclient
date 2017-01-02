'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goSingleUpload
 *
 * @param {string} goModel Assignable angular expression to data-bind to.
 * @param {string} label The label for the input
 * @params {string} fileAdded See https://github.com/flowjs/ng-flow
 * @param {object} errorMessages Key value object with error code and translations.
 * @param {string} name The name of the input
 * @param {object} form The form object. name and form are required for validation
 * @param {string} iconCls An mdi icon class to set.
 * @example
 *
 * <go-single-upload icon-cls="mdi-file" file-added="!!{zip:1}[$file.getExtension()]" error-messages="{INVALIDSCORM: 'You uploaded an invalid scorm package'}" name="scormPackage" form="scormForm" label="Scorm module" go-model="model.scormPackage"></go-single-upload>
 */

angular.module('GO.Core').directive('goSingleUpload', [
	function( ) {
		return {
			restrict: 'E',
			scope: {
				label: '@',
				goModel: '=',
				form: '=?',
				name: '@?',
				errorMessages: '=?',
				fileAdded: '@?',
				iconCls: '@?'
			},
			controller: ['$scope', '$element', '$attrs', '$transclude', 'GO.Core.Services.ServerAPI', function($scope, $element, $attrs, $transclude, ServerAPI) {
					$scope.flowInit = ServerAPI.getFlowInit({singleFile: true});
				}],
			link: function(scope, element, attrs) {

				scope.uploadSuccess = function($file, $message) {
					var data = angular.fromJson($message);
					scope.goModel = data.data;
					//reset all errors
					if (scope.form && scope.name) {
						for (var key in scope.form[scope.name].$error) {
							scope.form[scope.name].$setValidity(key, true);
						}
					}
				};

				scope.remove = function() {
					scope.goModel = null;
				};

			},
			templateUrl: 'core/directives/form/single-upload/single-upload.html'
		};
	}]);
