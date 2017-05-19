'use strict';


GO.module('GO.Core').controller('GO.Core.Controller.MailTo', ['$scope', function ($scope) {

				this.$onInit = function() {
					if(!this.displayName) {
						this.displayName = this.to;
					}
				};
				
				
				if(!$scope.compose) {
					$scope.compose = function(config) {					
						document.location = 'mailto:' + config.to;
					};
				}
		}]);


GO.module('GO.Core').component('goMailTo', {
	bindings: {
		to: '@',
		displayName: '@?'		
	},
	controller: 'GO.Core.Controller.MailTo',
	templateUrl: 'core/components/mailto/component.html'
});
