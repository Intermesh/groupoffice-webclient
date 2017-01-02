'use strict';

GO.module('GO.Modules.GroupOffice.Announcements').
				controller('GO.Modules.GroupOffice.Announcements.AnnouncementEditController', ['$scope', 'config', 'close', 'GO.Modules.GroupOffice.Announcements.Announcement',
					function ($scope, config, close, Announcement) {

						var config = config || {};
						$scope.announcement = config.announcement || new Announcement();
		
						$scope.close = close;

						$scope.save = function () {
							return $scope.announcement.save()
											.then(function (result) {
												return close($scope.announcement);
											});
						};

						$scope.announcement.readIf($scope.announcement.id || config.id || 0).then(function () {

						});


					}]);