'use strict';

GO.module('GO.Core').component('goTagFilter', {
	bindings: {
		selectedTags: '<',
		recordClassName: '@',
		onChange: '&'
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Tag',
		function ($scope, Tag) {
			
			this.$onInit = function() {
				this.store = (new Tag()).getStore({
					recordClassName: this.recordClassName
				});
				this.store.load();
				
				if(!this.selectedTags) {
					this.selectedTags = [];
				}
			};
			
			
			
			//unfortunately I coulnd't get list item to wrap into component becuase of this:
			//http://stackoverflow.com/questions/38769364/md-list-item-with-ng-click-does-not-work-in-directive
			$scope.update = function(value) {				
				this.onChange({value: value});
			}.bind(this);
			
//			$scope.selectedTags = this.selectedTags;
//			
//			$scope.$watch('selectedTags', function() {
//				this.onChange({selectedTags: $scope.selectedTags});
//			}.bind(this));
		}],
	templateUrl: 'core/components/tags/filter/component.html'
});
