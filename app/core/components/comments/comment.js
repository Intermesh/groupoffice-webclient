'use strict';

angular.module('GO.Core').factory('GO.Core.Components.Comment', [
	'GO.Core.Factories.Data.Model',
	function (Model) {
		var Comment = GO.extend(Model, function (route) {
			
			this.$route = route;
			
			this.$parent.constructor.call(this, arguments);

		});
		
		Comment.prototype.$returnProperties = "*";
		
		Comment.prototype.getStoreRoute = function () {
			return this.$route;
		};

		return Comment;
	}]);
