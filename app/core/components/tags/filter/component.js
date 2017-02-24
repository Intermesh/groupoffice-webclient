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

			this.$onInit = function () {
				this.store = (new Tag()).getStore({
					limit: 0,
					recordClassName: this.recordClassName
				});
				this.store.load();

				if (!this.selectedTags) {
					this.selectedTags = [];
				}
			};


			//this automatically updates the store when a model is updated.
			$scope.$on('modelupdate', function (event, updatedModel) {
				if (updatedModel.getStoreRoute() === this.store.$storeRoute) {
					this.store.updateModel(updatedModel);
				}
			}.bind(this));
			
			$scope.$on('tagschange', function(){
				this.store.reload();
			}.bind(this));



			//unfortunately I coulnd't get list item to wrap into component becuase of this:
			//http://stackoverflow.com/questions/38769364/md-list-item-with-ng-click-does-not-work-in-directive
			$scope.update = function (value) {
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
