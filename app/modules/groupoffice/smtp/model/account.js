'use strict';

angular.module('GO.Modules.GroupOffice.Smtp').
				factory('GO.Modules.GroupOffice.Smtp.Model.Account', [
						'GO.Core.Factories.Data.Model', 
						function (Model) {
						
						//Extend the base model and set default return proeprties
						var Account = GO.extend(Model, function () {														
							this.$parent.constructor.call(this,arguments);
						});

						Account.prototype.getStoreRoute = function() {
							return 'smtp/accounts';
						};

						return Account;
					}]);
