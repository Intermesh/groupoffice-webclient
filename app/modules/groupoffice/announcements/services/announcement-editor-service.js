'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Announcements').
				factory('GO.Modules.GroupOffice.Announcements.AnnouncementEditor', ['GO.Core.Services.Dialog', function (Modal) {

						var AnnouncementEditor = function () {

						};

						/**
						 * AnnouncementEditor.show({announcement: null, attributes: {name: this.from.personal, emailAddresses: [{email: this.from.email}]}});
						 * @param {type} config
						 * @returns {unresolved}
						 */
						AnnouncementEditor.prototype.show = function (config) {
							return Modal.show({
								templateUrl: 'modules/groupoffice/announcements/views/announcement-edit.html',
								controller: 'GO.Modules.GroupOffice.Announcements.AnnouncementEditController',
								inputs: {
									config: config
								}
							});
						};

						return new AnnouncementEditor();
					}]);