'use strict';

angular.module('GO.Modules.GroupOffice.Contacts').factory('GO.Modules.GroupOffice.Contacts.Model.ContactGroup', [
	'GO.Core.Factories.Data.Model',
	function (Model) {
		var ContactGroup = GO.extend(Model, function () {
			//rename function because this record has a delete attribute on the server
			this.deleteRecord = this.delete;
			
			this.$parent.constructor.call(this, arguments);

		});

		ContactGroup.prototype.getStoreRoute = function () {
			return 'contacts/'+this.contactId+'/permissions';
		};
		
		ContactGroup.prototype.$keys = ['groupId'];
		
		


		return ContactGroup;
	}]);
