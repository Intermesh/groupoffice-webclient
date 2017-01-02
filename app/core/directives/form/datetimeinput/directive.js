
/**
 * @ngdoc directive
 * @name GO.Core.dateTimePickerInput
 * @element input
 * 
 * @description
 * An input field with where you can enter numeric values
 *
 * @example
 *	<input date-time-picker-input='' date-format='YMWDHIS' />
 */
angular.module('GO.Core').directive('dateTimePickerInput', ['$mdDialog', '$filter', function($mdDialog, $filter) {
			return {
				restrict: 'A',
				require: 'ngModel',
				scope: {
					model: '=ngModel'
				},
				link: function(scope, element, attrs, ngModelCtrl) {

					if(element[0].tagName.toLowerCase() !== 'input' || attrs['type'].toLowerCase() !== 'text') {
						throw new Error('date-time-picker-input directive must be instantiated as an attribute of a input with type="text"');
					}
					var _openModal;
					element.on('focus', function(){
						if(_openModal) return;
						
						ngModelCtrl.$setTouched();
						
						$mdDialog.show({
							template: '<time-date-picker display-mode="{{displayMode}}"\
								default-mode="{{defaultMode}}"\
								default-date="{{defaultDate}}"\
								mindate="{{mindate}}"\
								maxdate="{{maxdate}}"\
								ng-model="model"\
								on-cancel="onCancel()"\
								on-save="onSave()"></time-date-picker>',
							scope: scope.$new(),
							//clickOutsideToClose: true,
							controller: [
								'$scope', function ($scope) {
									angular.forEach(['displayMode', 'defaultDate', 'defaultMode', 'mindate', 'maxdate'], function (key) {
										scope[key] = attrs[key];
									});
									if(angular.isDate(ngModelCtrl.$modelValue)) {
										scope.model = new Date(ngModelCtrl.$modelValue);
									}

									$scope.onCancel = function () {
										element[0].focus();
										element[0].blur();
										_openModal = null;
										$mdDialog.hide();
									};
									$scope.onSave = function () {
										ngModelCtrl.$setViewValue($scope.model);
										ngModelCtrl.$setDirty();
										element.val(formatDate($scope.model));
										element[0].focus();
										element[0].blur();
										_openModal = null;
										$mdDialog.hide();
									};
								}
							],
							show: true
						});
						_openModal = true;
					});

					if(attrs['ngMin']) {
						ngModelCtrl.$validators['min'] = function (dateValue) {
							return new Date(dateValue) >= new Date(attrs['ngMin']);
						};
					}

					if(attrs['ngMax']) {
						ngModelCtrl.$validators['max'] = function (dateValue) {
							return new Date(dateValue) <= new Date(attrs['ngMax']);
						};
					}

					ngModelCtrl.$formatters.push(formatDate);
					function formatDate(value){
						return $filter('date')(value, attrs['displayFormat'] || 'EEEE d MMMM yyyy, h:mm a');
					};
				}
			};
		} ]
	);