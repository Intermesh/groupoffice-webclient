'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Announcements').
				controller('GO.Modules.GroupOffice.Announcements.AnnouncementController', ['$scope', '$http', 'GO.Core.Services.ServerAPI', 'GO.Modules.GroupOffice.Announcements.Announcement', 'GO.Core.Services.ServerModules', 'GO.Modules.GroupOffice.Announcements.AnnouncementEditor', function ($scope, $http, ServerAPI, Announcement, Modules, AnnouncementEditor) {

						var announcement = new Announcement();
						
						$scope.store = announcement.getStore({returnProperties: '*,owner[username]'});
						$scope.store.load();

						Modules.getModule('GO\\Modules\\GroupOffice\\Announcements\\Module').then(function (module) {
							$scope.announcementsModule = module;
						});


						$scope.edit = function (config) {
							
							var config = config || {};
							
							if(!config.announcement) {
								config.announcement = new Announcement();
								config.announcement.addStore($scope.store);
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
