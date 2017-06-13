angular.module('GO.Core').directive('goListDeleteButton', [
	function ( ) {
		
		return {
		
			controller : ['$scope', '$attrs', function($scope, $attrs) {
					
					$scope.delete = function(model) {
						if($attrs.useMarkDeleted) {
							model.markDeleted = true;
						} else
						{
							model.delete();
						}
					};
					
					$scope.unDelete = function(model) {
						if($attrs.useMarkDeleted) {
							model.markDeleted = false;
						} else
						{
							model.unDelete();
						}
					};
					
				}],
			template: '<md-button ng-if="!model.deleted && !model.markDeleted" class="md-icon-button md-secondary" ng-disabled="model.permissions && !model.permissions.write" ng-click="delete(model)">\
				<md-tooltip>{{::"Delete"| goT}}</md-tooltip>\
				<md-icon>delete</md-icon>\
			</md-button>\
			\
			<md-button ng-if="model.deleted || model.markDeleted" class="md-icon-button md-primary" ng-click="unDelete(model)">\
				<md-tooltip>{{::"Undo"| goT}}</md-tooltip>\
				<md-icon>undo</md-icon>\
			</md-button>'
		};
	}]);
