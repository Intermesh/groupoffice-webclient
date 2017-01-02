//files
//filesStore

'use strict';

angular.module('GO.Modules.GroupOffice.Files').factory('GO.Modules.GroupOffice.Files.Model.Disk', [
						'GO.Core.Factories.Data.Model', 
						function (Model) {
						
						//Extend the base model and set default return proeprties
						var diskModel = GO.extend(Model, function () {
							this.$parent.constructor.call(this, arguments);
						});
						
						
						diskModel.prototype.getStoreRoute = function() {
							'files/disks';
						};

						
						
						return diskModel;
					}]);
