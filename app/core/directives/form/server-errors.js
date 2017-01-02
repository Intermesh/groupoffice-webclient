'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.goMatch
 * @element input
 *
 * @description * 
 * Supply the function to execute on form submit. It also takes care of success 
 * and failure notifications from the server.
 * 
 * It's only called when the form is validated.
 * 
 * The variable "form" is available to pass the form controller to your handler
 *
 * @example
 * <form name="userForm"  novalidate go-submit="save()" go-server-errors="model.validationErrors">
 */
angular.module('GO.Core').directive('goServerErrors', ['$mdToast', 'GO.Core.Providers.Translate', function ($mdToast, Translate) {
	return {
		require: 'form',
		restrict: 'A',
		scope: {
			goServerErrors: '=',
			goSubmit: '&'
		},
		link: function (scope, elem, attrs, form) {
			var serverErrors = [];
			
			elem.bind('keyup', function () {
				for (var i = 0, l = serverErrors.length; i < l; i++) {
					var key = serverErrors[i][0];
					var code = serverErrors[i][1];
					form[key].$setValidity(code, true);
				}
				serverErrors = [];
				scope.goServerErrors = null;
			});
			
		
			if(elem[0].tagName === 'FORM') { //no ng-form
				elem.on('submit', function () {
					
					if (form.$valid) {							
						//prevent new form error
//						document.activeElement.blur();

						scope.goSubmit({form: form});
					}

					
				});
				
				scope.$watch(function() {				
					return !form.$valid && form.$submitted;
				}, function(invalid) {
					if(invalid) {
						$mdToast.show($mdToast.simple().position('top center').content(Translate.t("The form contains errors. Please check your input.")));
						
						if(elem[0].tagName === 'FORM') {
								// find the first invalid element
							var firstInvalid = elem[0].querySelector('.ng-invalid:not(ng-form)');
							// if we find one, set focus
							if (firstInvalid) {
									firstInvalid.focus();
							}
						}
					}
				});
				
			}
			
			scope.$watch('goServerErrors', function (e) {
				if(e) {
					console.error(e);
				}
				for (var key in e) {
					if (!form[key]) {
						console.error("Server validation error for '" + key + "' can't be displayed as there's no form field for it in "+form.name);
						continue;
					}
					form[key].$setValidity(e[key].code, false);			
					form[key].$setTouched();
					serverErrors.push([key, e[key].code]);					
					
				}
				
			});
		}
	};
}]);
