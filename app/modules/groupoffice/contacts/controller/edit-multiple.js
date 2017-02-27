GO.module('GO.Modules.GroupOffice.Contacts').controller('GO.Modules.GroupOffice.Contacts.Controller.EditMultiple', [
	'$scope', 
	'$mdDialog', 
	'items',
	'$http',
	'GO.Core.Services.ServerAPI',
	function ($scope, $mdDialog, items,$http, ServerAPI) {
		$scope.hide = function () {


			$mdDialog.hide();
		};

		$scope.model = {
			tags: []
		};

		$scope.save = function () {

			var data = [];

			angular.forEach(items, function (i) {
				data.push(angular.extend({
					id: i.id					
				},$scope.model));
			});


			$http.put(ServerAPI.url('contacts'), {data: data}).then(function () {
				$mdDialog.hide($scope.model);
			});


		};
	}]);
