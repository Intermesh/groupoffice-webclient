'use strict';

GO.module('GO.Modules.Tutorial.Bands').
				controller('GO.Modules.Tutorial.Bands.Controller.Main', [
					'$scope',
					'GO.Modules.Tutorial.Bands.Model.Band',
					'GO.Core.Services.Dialog',
					'$state',
					function ($scope, Band, Dialog, $state) {

						$scope.band = new Band();
						
						$scope.store = $scope.band.getStore({
							returnProperties: "id,name,createdAt"
						});

						$scope.edit = function (band) {

							if (!band) {
								band = new Band();
								band.addStore($scope.store);
								band.read();
							}

							Dialog.show({
								editModel: band,
								controller: 'GO.Modules.Tutorial.Bands.Controller.BandEdit',
								templateUrl: 'ux/tutorial/modules/groupoffice/bands/views/band-edit.html'
							}).then(function (dialog) {
								dialog.close.then(function (band) {
									if (band) {
										$state.go("bands.band", {bandId: band.id});
									}
								});
							});
						};

					}]);
