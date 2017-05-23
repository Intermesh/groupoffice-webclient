'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Announcements').
				controller('GO.Modules.GroupOffice.Announcements.AnnouncementController', ['$scope', '$http', 'GO.Core.Services.ServerAPI', 'GO.Modules.GroupOffice.Announcements.Announcement', 'GO.Modules.GroupOffice.Announcements.AnnouncementEditor', function ($scope, $http, ServerAPI, Announcement, AnnouncementEditor) {

						var announcement = new Announcement();
						
						$scope.store = announcement.getStore({returnProperties: '*,owner[username]'});
						$scope.store.load();



						$scope.edit = function (config) {
							
							var config = config || {};
							
							if(!config.announcement) {
								config.announcement = new Announcement();
							}
							
							AnnouncementEditor.show(config).then(function (data) {
								data.close.then(function (announcement) {

									if (announcement) {									
										$scope.store.load();
									}

								});
							});
						};

					}]);
