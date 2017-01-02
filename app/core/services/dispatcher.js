'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Dispatcher
 *
 * @description
 * Dispatches responses from the server to the registered callbacks in the client.
 *
 */

angular.module('GO.Core').service('GO.Core.Dispatcher', [
	function () {
		
		var notificationsResponseKey = 'actions';
		var registeredCallbacks = {};
		var isDispatching=false;
		var Dispatcher = function(){
			
		};

		/**
		 * 
		 * @param {type} response
		 * @returns {Boolean}
		 */
		Dispatcher.prototype.dispatch = function (response) {
					
			// Check for the responsekey if it exists in this requests result.
			if(isDispatching || angular.isUndefined(response.data.notificationsResponseKey)){
				return true;
			}
			
			var length,
					i=0,
					key,
					responseData;
			
			isDispatching = true;

			for(key in registeredCallbacks){
				length = registeredCallbacks[key].length;
				
				i=0;
				for(i; i<length; i++){

					responseData = response.data[notificationsResponseKey][key];
						
					if(!angular.isUndefined(responseData))
					registeredCallbacks[key][i].call(undefined, responseData, response);
//					if(!responseData){
//						responseData = [];
//					}
//								
				}
			}
			
			isDispatching = false;
			
			return true;
		};
		
		/**
		 * Register a dispatch listener
		 * The listener checks for the given "key" in the "notifications" (notificationsResponseKey) response.
		 * When it is givem, then the callback function is called.
		 * 
		 * The following exampla checks for "response.data.notifications.modules" 
		 * and if it is set then it triggers an alert with the response data 
		 * displayed.
		 * 
		 * Example:
		 * Dispatcher.register('modules',function(response){ alert(response); });
		 * 
		 * 
		 * @param {String} key
		 * @param {Function} callback
		 * @returns {Boolean}
		 */
		Dispatcher.prototype.register = function (key,callback) {
			
			if(!registeredCallbacks[key]){
				registeredCallbacks[key] = [];
			}
			
			registeredCallbacks[key].push(callback);
			return true;
		};
		
		/**
		 * Unregister a dispatch listener
		 * 
		 * The following example removes the 'modules' callback from the dispatcher.
		 * 
		 * Example: 
		 * Dispatcher.unregister('modules');
		 * 
		 * @param {String} key
		 * @returns {Boolean}
		 */
		Dispatcher.prototype.unregister = function (key) {
			
			if(!registeredCallbacks[key]){
				return true;
			}
			
			delete registeredCallbacks[key];
			
			return true;
		};

		return new Dispatcher;

	}]);