
/**
 * @ngdoc directive
 * @name GO.Core.goNumber
 * @element input
 * 
 * @description
 * An input field with where you can enter numeric values
 * 
 * @example
 *	<go-multiple title="E-mail addresses" go-models="model.emailAddresses" go-add-model="{address: '', type:'work'}">
 *
 *			<md-input-container flex>							
 *				<input type="email" name="email" ng-model="model.email" required go-autofocus="!model.id">
 *				<div ng-messages="multipleForm.email.$error" role="alert">
 *					<div ng-message="required">
 *					{{::"This field is required"| goT}}
 *					</div>
 *
 *					<div ng-message="email">
 *					{{::"Invalid e-mail address"| goT}}
 *					</div>
 *
 *				</div>
 *			</md-input-container>
 *
 *			<md-input-container style="width:100px">
 *				<md-select ng-model="model.type">
 *					<md-option ng-value="value" ng-repeat="(value, label) in viewScope.contactLabels.emailAddressOptions">{{label}}</md-option>
 *				</md-select>
 *			</md-input-container>
 *
 *		</go-multiple>
 */

angular.module('GO.Core').directive('inject', function(){
  return {
    link: function($scope, $element, $attrs, controller, $transclude) {
      if (!$transclude) {
        throw minErr('ngTransclude')('orphan',
         'Illegal use of ngTransclude directive in the template! ' +
         'No parent directive that requires a transclusion found. ' +
         'Element: {0}',
         startingTag($element));
      }
      var innerScope = $scope.$new();
			innerScope.viewScope = $scope.$parent.$parent.$parent.$parent;
      $transclude(innerScope, function(clone) {
        $element.empty();
        $element.append(clone);
        $element.on('$destroy', function() {
          innerScope.$destroy();
        });
      });
    }
  };
}).directive('goMultiple', ['$timeout',
	function ($timeout) {
		
		var uniqueId = -1;
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				title: '@',
				iconCls: '@',
				goModels: '=',
				goAddModel: '=?',
				sortableOn: '@',
				data:"=?"
			},
			templateUrl: "core/directives/form/multiple/multiple.html",
			controller:['$scope', '$element', '$attrs', function(scope, element, attrs) {
					
//					element.id = 'multiple'+rand(0,9);
					
//				var id = 'multiple-'+uniqueId++;
				
//				element.attr('id', id);

//				scope.viewScope = scope.$parent;
				
//				console.log(scope);

				
				scope.dragControlListeners = {
//					containment: '#'+id,
						accept: function (sourceItemHandleScope, destSortableScope) {
							return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
						},
						itemMoved: function (event) {//Do what you want
						},
						orderChanged: function(event) {//Do what you want
//							goModels
							for(var i=0,l=scope.goModels.length;i<l;i++) {
								scope.goModels[i][scope.sortableOn] = i;
							}
						},
						//containment: '#board',//optional param.
						clone: false, //optional param for clone feature.
						allowDuplicates: false //optional param allows duplicates to be dropped.
				};
				
				scope.delete = function(index) {
					
					//md-autocomplete can set the model to null if no value is entered
					if(!scope.goModels[index]) {
						scope.goModels[index] = {};
					};
					
					scope.goModels[index].markDeleted = true;
				};
				
				scope.add = function() {
					
					if(!scope.goAddModel) {
						
						//wierd bug in Angular Material. If we add a proper object it will show [Object Object]
						scope.goAddModel = {};//"";
					};
					
					var newModel = angular.copy(scope.goAddModel);
					if(scope.sortableOn) {
						newModel[scope.sortableOn] = scope.goModels.length;
					}
					scope.goModels.push(newModel);
					
					
				};
			}]
//      transclude(scope.$new(), function(clone) {
//        element.append(clone);
//      });
//      transclude(scope.$new(), function(clone) {
//        element.append(clone);
//      });
//      transclude(scope.$new(), function(clone) {
//        element.append(clone);
//      });
//    }
//			template: function(tElement, tAttr) {
//				var t = '<div layout="row" layout-align="space-between start">\
//				<h3>{{title | goT}}</h3>\
//					<div>\
//						<md-button class="md-icon-button" aria-label="{{\'Add\' | goT}}" ng-click="goModels.push({})">\
//							<md-icon class="mdi-plus md-primary"></md-icon>\
//						</md-button>\
//					</div>\
//				</div>\
//				<div class="go-input-multiple">\
//					<div layout ng-init="model.$formName = \'pn_\' + $index"  ng-repeat="model in goModels" ng-if="!model.markDeleted">\
//						<div flex layout="row">'+tElement[0].innerHTML+'</div>\
//				\
//						<md-button class="md-icon-button" type="button"  ng-click="model.markDeleted = true">\
//							<md-icon aria-label="{{::\'Delete\'| goT}}" class="mdi-close md-warn"></md-icon>\
//						</md-button>\
//					</div>\
//				</div>';
//				
//				return t;
//				
//			}
		};
	}]);
