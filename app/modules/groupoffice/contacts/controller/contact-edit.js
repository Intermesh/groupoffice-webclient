'use strict';

GO.module('GO.Modules.GroupOffice.Contacts').
				controller('GO.Modules.GroupOffice.Contacts.ContactEditController', [
					'$scope',
					'read',
					'config',
					'GO.Core.Services.ServerAPI',
					'$http',
					'$q',
					'GO.Modules.GroupOffice.Users.Model.Group',
					'GO.Core.Providers.Translate',
					'GO.Core.Factories.Models.Tag',
					'GO.Modules.GroupOffice.Contacts.ContactLabels',
					'close',
					'GO.Modules.GroupOffice.Contacts.Model.Contact',
					'$controller',
					function ($scope, read, config, ServerAPI, $http, $q, Group, Translate, Tag, contactLabels, close, Contact, $controller) {


						$scope.contactLabels = contactLabels;
						
						
						var origSave = $scope.save;
						
						$scope.save = function() {				
														
							GO.markArrayDeleted(['id'], $scope.model.$oldAttributes.tags, $scope.model.tags);							
							return origSave.call(this);
						};

						read.then(function () {

//							if ($state.is('contacts.createOrganization')) {
//								$scope.contact.isOrganization = true;
//							}

							if (!$scope.model.isOrganization) {
								$scope.model.name = $scope.model.firstName;

								if ($scope.model.middleName !== "") {
									$scope.model.name += " " + $scope.model.middleName;
								}

								if ($scope.model.lastName !== "") {
									$scope.model.name += " " + $scope.model.lastName;
								}
							}

							if (config.attributes) {
								$scope.model.setAttributes(config.attributes);
								$scope.changeFullName();
							}

							$scope.private = $scope.model.groupId == null;
						});


						/* Multiple fields */
						$scope.addEmailAddress = function () {
							$scope.model.emailAddresses.push({type: "work"});
						};

						$scope.addPhoneNumber = function () {
							$scope.model.phoneNumbers.push({type: "work,voice"});
						};

						$scope.addAddress = function () {
							$scope.model.addresses.push({type: "work"});
						};

						$scope.addDate = function () {
							$scope.model.dates.push({type: "anniversary", date: new Date()});
						};
						/* End multiple fields */




						$scope.changeFullName = function () {

							if ($scope.model.name) {
								var parts = $scope.model.name.split(' ');

								$scope.model.firstName = parts.shift();



								if (parts.length > 1) {
									$scope.model.middleName = parts.shift();
								} else
								{
									$scope.model.middleName = "";
								}

								$scope.model.lastName = parts.join(' ');

								//If there's a comma after the first word then assume flipped names:
								//eg. Smith, John
								if ($scope.model.firstName.substring($scope.model.firstName.length - 1) == ',') {
									var lastName = $scope.model.firstName.substring(0, $scope.model.firstName.length - 1);
									$scope.model.firstName = $scope.model.lastName;
									$scope.model.lastName = lastName;

									$scope.model.name = $scope.model.firstName;

									if ($scope.model.middleName != '') {
										$scope.model.name += " " + $scope.model.middleName;
									}

									$scope.model.name += " " + $scope.model.lastName;
								}

							}
						};

						$scope.toggleName = function () {
							$scope.showNameParts = !$scope.showNameParts;
						};
						$scope.showNameParts = false;

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

//						var groupStore = new Group().getStore();
//						$scope.getGroups = function (input) {
//							return groupStore.load({
//								searchQuery: input
//							}).then(function (data) {
//								return data.results;
//							});
//						};

						$scope.getOrganizations = function (input) {
							
							return $http.get(ServerAPI.url('contacts', {
								searchQuery: input,
								where: [{'isOrganization': true}],
								returnProperties: 'name,id'
							}))
											.then(function (result) {

												function exactMatch(input) {
													for (var i = 0, l = result.data.data.length; i < l; i++) {
														if (result.data.data[i]['name'].toLowerCase() == input.toLowerCase()) {
															return true;
														}
													}

													return false;
												}

												if (!exactMatch(input)) {
													result.data.data.unshift({'name': input, 'isOrganization': true});
												}
//																console.log(result);
												return result.data.data;
											});

						};
//						$scope.datePickerOptions = {
//							formatYear: 'yy',
//							startingDay: 1
//						};

					}]);