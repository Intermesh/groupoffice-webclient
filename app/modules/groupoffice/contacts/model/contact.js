'use strict';

angular.module('GO.Modules.GroupOffice.Contacts').factory('GO.Modules.GroupOffice.Contacts.Model.Contact', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.ServerAPI',
	function (Model, ServerAPI) {
		var Contact = GO.extend(Model, function () {
			
			this.$parent.constructor.call(this, arguments);

			

		});
		
		Contact.prototype.$returnProperties = "*,photoBlob,emailAddresses,phoneNumbers,dates,addresses[*,formatted],tags[id,name,color],customfields,organizations[id,name],employees[id, name, photoBlobId],urls";

		Contact.prototype.getStoreRoute = function () {
			return 'contacts';
		};

		Contact.prototype.download = function() {
			window.open(ServerAPI.url('contacts/'+this.id+'/vcard'));
		};

		return Contact;
	}]);