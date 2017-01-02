'use strict';

GO.module('GO.Modules.GroupOffice.Tasks').controller('GO.Modules.GroupOffice.Tasks.Controller.TaskEdit', [
	'$scope',
	'close', // You can inject the 'close' function. When called the dialog closes.
	'read', // You can inject the 'read' promise. This is resolved when the passed 'editModel' is done with it's read request to the server.
	'GO.Core.Factories.Models.Tag',
	function ($scope, close, read, Tag) {

		read.then(function (result) {


		});


		var tagStore = new Tag().getStore({returnProperties: "id,name,color", limit: 0});

		$scope.getTags = function (input) {

			return tagStore.load({
				searchQuery: input
			}).then(function (result) {
				return result.store.items;
			});

		};

		$scope.createTag = function (chip, index) {

			if (!chip.name) {
				chip = {name: chip};
			}
			$scope.model.tags[index - 1] = chip;
		};
		
		
		$scope.setAssignee = function(user) {			
			$scope.model.assignee=user;
		};


	}]);