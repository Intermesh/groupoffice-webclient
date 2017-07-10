'use strict';

angular.module('GO.Core').factory('GO.Core.Factories.Models.Templates.Message', [
	'GO.Core.Factories.Data.Model',
	function (Model) {
		var Message = GO.extend(Model, function (moduleClassName, types) {
			this.$types = types;
			this.$moduleClassName = moduleClassName;
			
			this.$parent.constructor.call(this, arguments);

		});
		
		Message.prototype.$returnProperties = "*";
		
		Message.prototype.getStoreRoute = function () {
			return 'templates/messages/'+encodeURIComponent(this.$moduleClassName);
		};

		return Message;
	}]);
