'use strict';

GO.module('GO.Modules.Tutorial.Bands').
				controller('GO.Modules.Tutorial.Bands.Controller.Band', [
					'$scope',
					'$stateParams',
					function ($scope, $stateParams) {
						$scope.band.readIf($stateParams.bandId);
					}]);
