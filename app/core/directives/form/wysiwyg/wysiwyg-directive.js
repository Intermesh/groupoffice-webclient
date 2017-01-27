/**
 * @ngdoc directive
 * @name GO.Core.goWysiwyg
 * @element div
 * 
 * @description
 * Creates a wysiwyg HTML editor
 * 
 * @param {string} ngModel
 * @param {function} onImagePaste
 * @param {string} placeholder
 * 
 * @example
 *	<div flex go-wysiwyg flex ng-model="composer.body.html" on-image-paste="onImagePaste(blob, editor)"></div>
 */

angular.module('GO.Core').directive('goWysiwyg', [
	'GO.Core.Services.ServerAPI',
	'$timeout',
	'GO.Core.Form.Wysiwyg.ImagePaster',
	function (ServerAPI, $timeout, ImagePaster) {
		return {
			scope: {
				model: '=ngModel',
				placeholder: '@',
				onImagePaste: '&?'
			},
			replace: true,
			templateUrl: 'core/directives/form/wysiwyg/wysiwyg.html',
//							restrict: 'E',
			link: function (scope, element, attrs) {
				//Angular puts all attributes on the new top element.
				//We don't want to move the id to the div but to the new input element so label focusing works
				scope.inputId = attrs.id || ServerAPI.getID();
				element.addClass('go-wysiwyg');
				var editor;

				//timeout is required for scope.id to be replaced in the template.
				$timeout(function () {

					element.attr("id", scope.inputId + '_wrap');

					editor = new wysihtml5.Editor(scope.inputId, {
						toolbar: scope.inputId + "_toolbar",
						parserRules: wysihtml5ParserRules,
						pasteParserRulesets: wysihtml5ParserPasteRulesets
						
					});

					function setModelValue() {
						scope.$apply(function () {
							scope.model = editor.getValue();
						});
					}

					editor.on("interaction", setModelValue);
					editor.on("change", setModelValue);


					if (scope.onImagePaste) {
						var paster = new ImagePaster(editor, scope.onImagePaste);

					}

					scope.$watch('model', function (val) {
						if (val != editor.getValue()) {
							editor.setValue(val);
						}
					});

					scope.$on('$destroy', function () {
						editor.destroy();
					});



				});

				//For go-autofocus on main element. Pass focus to editor element.
				element.on('focus', function () {
					$timeout(function () {
						editor.focus();
					}, 10);
				});
			}
		};
	}]);