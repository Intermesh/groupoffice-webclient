'use strict';

angular.module('GO.Core').factory('GO.Core.Factories.Models.Templates.Pdf', [
	'GO.Core.Factories.Data.Model',
	function (Model) {
		var Pdf = GO.extend(Model, function (moduleClassName) {
			
			this.$moduleClassName = moduleClassName;
			
			this.$parent.constructor.call(this, arguments);

		});
		
		Pdf.prototype.$returnProperties = "*,blocks,stationaryPdfBlob";
		
		Pdf.prototype.getStoreRoute = function () {
			return 'templates/pdf/'+encodeURIComponent(this.$moduleClassName);
		};

		return Pdf;
	}]);

