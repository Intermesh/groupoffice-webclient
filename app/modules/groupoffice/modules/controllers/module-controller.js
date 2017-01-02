'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Modules').
				controller('GO.Modules.GroupOffice.Modules.ModuleController', [
					'$scope',
					'$stateParams',
					'GO.Core.Services.ServerAPI',
					'GO.Core.Factories.Data.Store',
					'$rootScope',
					'GO.Modules.GroupOffice.Users.Model.Group',
					'$http',
					function ($scope, $stateParams, ServerAPI, Store, $rootScope, Group, $http) {


						

						$scope.install = function ($event) {
//			console.log($event);

							$scope.module.reset();
							$scope.module.deleted = false;
							$scope.module.touchAttribute('name');
							$scope.module.save().then(function () {
								// Trigger the "moduleInstalled" event in the rootScope
								$rootScope.$broadcast('moduleInstalled');
							});
						};

						$scope.disable = function () {

							$scope.module.delete().then(function () {
								// Trigger the "moduleUninstalled" event in the rootScope
								$rootScope.$broadcast('moduleUninstalled');
							});
						};



						$scope.permissionStore = new Store('modules/' + encodeURIComponent($stateParams.moduleName) + '/permissions');
						

						var groupStore = new Group().getStore({returnProperties: "id,name", limit: 10});

						$scope.getGroups = function (input) {
							return groupStore.load({
								searchQuery: input
							}).then(function (result) {
								return result.store.items;
							});
						};

						$scope.selectedGroup;
						$scope.groupSearchText = "";
						$scope.$watch('selectedGroup', function (v) {
							if (v) {
								$scope.groupSearchText = "";

								var url = ServerAPI.url('modules/groupoffice/'+encodeURIComponent($stateParams.moduleName) +'/permissions/'+v.id+'/read');								
								$http.post(url).then(function() {
									$scope.permissionStore.reload();
								});

								
							};
						});


						$scope.deleteRecord = function (groupId) {
							var url = ServerAPI.url('modules/groupoffice/'+encodeURIComponent($stateParams.moduleName) +'/permissions/'+groupId);								
								$http.delete(url).then(function() {
									$scope.permissionStore.reload();
								});
						};

						$scope.togglePermission = function (group, action) {						
												
							var url = ServerAPI.url('modules/groupoffice/'+encodeURIComponent($stateParams.moduleName) +'/permissions/'+group.id+'/'+action.name);
							if(group.permissions[action.name]) {
								$http.post(url);
							}else
							{
								$http.delete(url);
							}
							
						};
						
						
						
						//Module model is defined in the parent scope of ModuleController			
						$scope.module.readIf($stateParams.moduleName).then(function () {
							
							if($scope.module.installed) {
								$scope.permissionStore.load();							
							}
						});
					}]);