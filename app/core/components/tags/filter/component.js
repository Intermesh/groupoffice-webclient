'use strict';

GO.module('GO.Core').component('goTagFilter', {
	bindings: {
		selectedTags: '<',
		recordClassName: '@',
		onChange: '&',
		storeRoute: '@?',
		storeLoadParams: '<?'
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Tag',
		function ($scope, Tag) {
			
			var me = this;

			this.$onInit = function () {
			
				me.store = (new Tag()).getStore({
					limit: 0,
					recordClassName: me.recordClassName
				});
				
				if(me.storeRoute) {
					me.store.$storeRoute = me.storeRoute;
				};
				
				if(this.storeLoadParams) {
					me.store.$loadParams = me.storeLoadParams;
				};
				
				me.store.load();

				if (!me.selectedTags) {
					me.selectedTags = [];
				}
				
				
				me.$onChanges = function(changesObj){
					
					if(changesObj.storeRoute) {
						me.store.$storeRoute = changesObj.storeRoute.currentValue;
					}

					if(changesObj.storeLoadParams) {
						me.store.$loadParams = changesObj.storeLoadParams.currentValue;
					}
						
					if(changesObj.storeRoute || changesObj.storeLoadParams) {
						me.store.load();
						me.selectedTags = [];
						
						me.onChange({value: []});
					}
				};

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
