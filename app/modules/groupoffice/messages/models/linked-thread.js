'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Messages').factory('GO.Modules.GroupOffice.Messages.Model.LinkedThread', [
	'GO.Modules.GroupOffice.Messages.Model.Thread', 
	function (Thread) {
		var LinkedThread = GO.extend(Thread, function (recordClassName, recordId) {
			
			this.$recordClassName = recordClassName;
			this.$recordId = recordId;
			
			Thread.prototype.constructor.call(this, arguments);
		});
		
		LinkedThread.prototype.getStoreRoute = function() {
			return 'messages/threads/links/'+encodeURIComponent(this.$recordClassName)+'/'+this.$recordId;
		};

		return LinkedThread;

	}]);
