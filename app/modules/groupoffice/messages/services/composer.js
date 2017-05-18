'use strict';

angular.module('GO.Modules.GroupOffice.Messages').service('GO.Modules.GroupOffice.Messages.Services.Composer', [
	'GO.Modules.GroupOffice.Messages.Services.AccountStore',
	function (AccountStore) {
		
		var composer = function() {
			
		};
		
		
		composer.prototype.open = function(config) {
			return AccountStore.loadIf().then(function(){
							return AccountStore.items[0].getAccountModel().compose(config);
						});
		};
		
		
		return new composer();
		
		
		
	}]);