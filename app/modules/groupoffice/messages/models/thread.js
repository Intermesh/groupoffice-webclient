'use strict';



/* Controllers */
angular.module('GO.Modules.GroupOffice.Messages').factory('GO.Modules.GroupOffice.Messages.Model.Thread', [
	'GO.Core.Factories.Data.Model', 
	function (Model) {
		var Thread = GO.extend(Model, function () {
			
			Model.prototype.constructor.call(this, arguments);
			
			
		});
		
		Thread.prototype.$returnProperties = '*,tags';
		
		Thread.prototype.getStoreRoute = function() {
			return 'messages/threads';
		};
		
		Thread.prototype.delete = function() {
			this.type = 4;
			return this.save();
		};
		
		
		Thread.prototype.getFrom = function () {

			var parts = [];
			for (var i = 0, l = this.from.length; i < l; i++) {

				if (this.from[i].isMe) {
					name = "Me";
				} else if (this.from[i].personal != '') {
					var names = this.from[i].personal.split(' ');
					var name = names[0].replace(/[,;]$/, '');
				} else
				{
					name = this.from[i].address;
				}
				
				parts.push(name);

			}
			return parts.join(', ');
		};

		return Thread;

	}]);