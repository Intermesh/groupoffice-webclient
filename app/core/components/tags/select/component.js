'use strict';

GO.module('GO.Core').component('goTagSelect', {
	bindings: {
		ngModel: '='
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Tag',
		function ($scope, Tag) {


			var tagStore = new Tag().getStore({returnProperties: "id,name,color", limit: 0});

			this.getTags = function (input) {

				return tagStore.load({
					searchQuery: input
				}).then(function (result) {
					return result.store.items;
				});

			};

			this.createTag = function (chip, index) {

				if (!chip.name) {
					chip = {name: chip};
				}
				this.ngModel[index] = chip.getAttributes();				
			};

		}],
	templateUrl: 'core/components/tags/select/component.html'
});
