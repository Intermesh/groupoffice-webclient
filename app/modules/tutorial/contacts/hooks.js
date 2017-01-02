
//Adds an extra card with id info2 to the contacts info panel
GO.hooks.register('bands.band' , ['element', function(element) {
	var contents = element.find('md-content');
	contents.prepend('<md-card id="info2"><md-card-content ng-include="\'ux/tutorial/modules/groupoffice/contacts/contact.html\'"></md-card-content></md-card>');

	var toolbar = element.find('md-tabs');	
	toolbar.prepend('<md-tab ng-click="goto(\'info2\')">Info 2</md-tab>');
}]);

//
//GO.hooks.overrideController("GO.Modules.GroupOffice.Contacts.ContactController", ["ctrlLocals", "$mdDialog", "GO.Core.Providers.Translate", function(ctrlLocals, $mdDialog, Translate){
//		
//	//example hook to put a confirm dialog before the original edit function of a contact
//		
//	//copy the original edit function so we can use it later after the confirmation
//	var origEdit = ctrlLocals.$scope.edit;
//
//	//overwrite the edit function
//	ctrlLocals.$scope.edit = function() {
//		
//		//copy function arguments to apply later
//		var args = arguments;
//		
//		//create confirm dialog
//		var confirm = $mdDialog.confirm()
//												.title(Translate.t('A stupid question'))
//												.textContent(Translate.t('Do you really want to edit this contact?'))
//												.ariaLabel('Confirm')
//												.ok(Translate.t("Yes"))
//												.cancel(Translate.t("No, take me away!"));
//								
//								$mdDialog.show(confirm).then(function () {
//
//									//call orignal edit function
//									return origEdit.apply(null, args);
//								}, function () {									
//									close();
//								});								
//	};
//}]);
//
//
//
//
//
//
