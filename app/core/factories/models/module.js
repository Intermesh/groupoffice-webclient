'use strict';

angular.module('GO.Core').
				factory('GO.Core.Factories.Models.Module', [
					'GO.Core.Factories.Data.Model',
					function (Model) {
						var Module = GO.extend(Model, function () {
							this.$parent.constructor.call(this, arguments);
						});						
						
						Module.prototype.getStoreRoute = function() {
							return 'modules';
						};

						return Module;
					}]);
