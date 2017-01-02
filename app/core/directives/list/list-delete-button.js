angular.module('GO.Core').directive('goListDeleteButton', [
	function ( ) {
		return {
			template: '<md-button ng-if="!model.deleted" class="md-icon-button md-secondary" ng-disabled="model.permissions && !model.permissions.delete" ng-click="model.delete()">\
				<md-tooltip>{{::"Delete"| goT}}</md-tooltip>\
				<md-icon>delete</md-icon>\
			</md-button>\
			\
			<md-button ng-if="model.deleted" class="md-icon-button md-primary" ng-click="model.unDelete()">\
				<md-tooltip>{{::"Undo"| goT}}</md-tooltip>\
				<md-icon>undo</md-icon>\
			</md-button>'
		};
	}]);
