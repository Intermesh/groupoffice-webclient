'use strict';

GO.module('GO.Modules.Tutorial.Bands').
				controller('GO.Modules.Tutorial.Bands.Controller.BandEdit', [
					'$scope',
					'close', // You can inject the 'close' function. When called the dialog closes.
					'read', // You can inject the 'read' promise. This is resolved when the passed 'editModel' is done with it's read request to the server.
					function ($scope, close, read) {
						
						read.then(function(result) {
							
							if(result.model.isNew()) {
								result.model.setAttributes({
									name: 'Default'
								});
							}
						});
						
					}]);

