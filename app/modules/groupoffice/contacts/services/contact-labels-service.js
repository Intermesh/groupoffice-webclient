'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Contacts').
				factory('GO.Modules.GroupOffice.Contacts.ContactLabels', ['GO.Core.Providers.Translate', function (Translate) {
						var contactLabels = {
							emailAddressOptions: {
								'work': Translate.t('Work'),
								'home': Translate.t('Home'),
								'billing': Translate.t('Billing'),
								'other': Translate.t('Other')
							},
							phoneNumberOptions: {
								'work,voice': Translate.t('Phone') + ' ' + Translate.t('Work'),
								'work,cell': Translate.t('Mobile') + ' ' + Translate.t('Work'),			
								'home,voice': Translate.t('Phone') + ' ' + Translate.t('Home'),			
								'home,cell': Translate.t('Mobile') + ' ' + Translate.t('Home')
							},
							dateOptions: {
								'birthday': Translate.t('Birthday'),
								'anniversary': Translate.t('Anniversary'),
								'other': Translate.t('Other')
							}
						};
					
						return contactLabels;
					}]);
