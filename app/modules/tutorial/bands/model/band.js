'use strict';

angular.module('GO.Modules.Tutorial.Bands').
				factory('GO.Modules.Tutorial.Bands.Model.Band', [
					'GO.Core.Factories.Data.Model',
					function (Model) {

						//Extend the base model and set default return proeprties
						var Band = GO.extend(Model, function () {

							this.$parent.constructor.call(this, arguments);

							this.$baseParams = {
								returnProperties: "*,albums,customFields"
							};

						});

						Band.prototype.getStoreRoute = function () {
							return 'bands';
						};

						return Band;
					}]);