angular.module('GO.Core').directive('goListEditButton', [
	function ( ) {
		return {
			scope: {
				onEdit: '&?'
			},
			template: '<md-button class="md-icon-button md-primary" ng-click="onEdit()" ng-disabled="model.permissions && !model.permissions.update || $parent.model.deleted">\
				<md-tooltip>{{::"Edit"| goT}}</md-tooltip>\
				<md-icon>edit</md-icon>\
			</md-button>'
		};
	}]);
