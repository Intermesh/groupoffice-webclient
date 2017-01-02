'use strict';
/**
 * @ngdoc directive
 * @name GO.Core.goCustomFieldsDetail
 * @element div
 * 
 * @description
 * Creates a wysiwyg HTML editor
 * 
 * @param {string} ngModel
 * @param {string} serverModel
 * 
 * @example
 * <go-custom-fields-detail ng-model="contact.customfields" server-model="GO\Modules\GroupOffice\Contacts\Model\ContactCustomFields"></go-custom-fields-detail>
 */
angular.module('GO.Core')		
		.directive('goCustomFieldsDetail', ['$templateCache', function($templateCache) {

				$templateCache.put('customfield-text-detail.html',							
								'<h3>{{goModel[field.databaseName]}}</h3>\
								<p>{{field.name}}</p>');

				$templateCache.put('customfield-textarea-detail.html',
						'<h3>{{goModel[field.databaseName]}}</h3>\
							<p>{{field.name}}</p>');
				
				$templateCache.put('customfield-select-detail.html',
						'<h3>{{goModel[field.databaseName]}}</h3>\
							<p>{{field.name}}</p>');
						
				$templateCache.put('customfield-checkbox-detail.html',
						'<h3><i ng-class="{\'checkbox-off\': !goModel[field.databaseName],\'checkbox-on\': goModel[field.databaseName]}"></i> {{field.name}}</h3>');
						
				$templateCache.put('customfield-date-detail.html',
						'<h3>{{goModel[field.databaseName] | date:\'longDate\'}}</h3>\
							<p>{{field.name}}</p>');
						
				$templateCache.put('customfield-datetime.html',
						'TODO!');
						
						
				$templateCache.put('customfield-number-detail.html',
						'<h3>{{goModel[field.databaseName] | number}}</h3>\
							<p>{{field.name}}</p>');

				return {
					restrict: 'E',
					scope: {
						goModel: '=ngModel',
						serverModel: '@'
					},
					controller: ['$scope','$element','$attrs','$transclude', 'GO.Core.Directives.CustomFields', function($scope, $element, $attrs, $transclude, CustomFields) {

						$scope.customFieldSetStore = CustomFields.getFieldSetStore($attrs.serverModel);			
						
						
						$scope.fieldSetIf = function(fieldSet){
							
							if(!$scope.goModel){
								return false;								
							}
							
							for(var i = 0, l = fieldSet.fields.length; i < l; i++) {
								if(!GO.isEmpty($scope.goModel[fieldSet.fields[i].databaseName])) {
									return true;
								}
							}
							
							return false;
						};
					}],
	
						template: '<div ng-if="fieldSetIf(fieldSet);"  ng-repeat="fieldSet in customFieldSetStore.items"><md-card >\
									<md-toolbar class="md-hue-1"><div class="md-toolbar-tools">{{fieldSet.name}}</div></md-toolbar>\
									<md-card-content>\
									<md-list>\
									<md-list-item class="md-2-line" ng-if="!$root.GO.isEmpty(goModel[field.databaseName])" ng-repeat="field in fieldSet.fields">\
									<md-icon>star</md-icon>\
									<div class="md-list-item-text" ng-include="\'customfield-\'+field.type+\'-detail.html\'"></div>\
								</md-list-item>\
							</md-list>\
							</md-card-content>\
							</md-card></div>'
				};
			}]);

	