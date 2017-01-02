'use strict';


GO.module('GO.Modules.GroupOffice.CustomFields', [])
.run([
		'GO.Core.Services.Application',
		function (App) {
			
			App.currentUser.whenAuthenticated().then(function(){
				if(App.currentUser.isAdmin) {
					App.addLauncher('Custom fields', 'customfields', false,{icon:'playlist_add'});
				}
			});

		}])
	.config(['$stateProvider', function($stateProvider) {

				// Now set up the states
				$stateProvider
						.state('customfields', {
							url: "/customfields",
							templateUrl: 'modules/groupoffice/customfields/views/main.html',
							controller: 'GO.Modules.GroupOffice.CustomFields.ModelsController'
						})
						.state('customfields.fieldset', {
							url: "/model/{modelName:[^/]*}",
							templateUrl: 'modules/groupoffice/customfields/views/field-set.html',
							controller: 'GO.Modules.GroupOffice.CustomFields.FieldSetController'
						})
						.state('customfields.fieldset.fields', {
							url: "/fields/{fieldSetId:[0-9]*}",
							templateUrl: 'modules/groupoffice/customfields/views/fields.html',
							controller: 'GO.Modules.GroupOffice.CustomFields.FieldsController'
						})
						.state('customfields.fieldset.field', {
							url: "/field/{fieldId:[0-9]*}",
							templateUrl: 'modules/groupoffice/customfields/views/field-form.html',
							controller: 'GO.Modules.GroupOffice.CustomFields.FieldsController'
//						})
//						.state('customfields.fieldset', {
//							url: "/fieldSet/{modelName:[^/]*}/{fieldSetId:[0-9]*}",
//							controller: "GO.Modules.GroupOffice.CustomFields.FieldSetController",
//							templateUrl: 'modules/groupoffice/customfields/views/field-set-form.html'
//						})
//						.state('customfields.model.field', {
//							url: "/fieldset/{fieldSetId:[0-9]*}/field/{fieldId:[0-9]*}",
//							controller: "GO.Modules.GroupOffice.CustomFields.FieldController",
//							templateUrl: 'modules/groupoffice/customfields/views/field-form.html'
						});
			}]);		