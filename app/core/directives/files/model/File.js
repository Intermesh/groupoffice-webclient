'use strict';

/* Controllers */
angular.module('GO.Core').
				factory('GO.Core.Directives.Files.File', ['GO.Core.Factories.Data.Model', function (Model) {
						var File = GO.extend(Model, function () {
							this.$parent.constructor.call(this, arguments);
						});
						
						File.prototype.$keys = ['path'];
						
						File.prototype.getStoreRoute = function() {
							return 'files';
						};
					
						return File;
					}]);