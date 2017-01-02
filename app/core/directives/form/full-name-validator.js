angular.module('GO.Core').directive('goFullNameValidator', function (){ 
   return {
      require: 'ngModel',
			scope: true,
      link: function(scope, elem, attr, ngModel) {		
								
				var form = ngModel.$$parentForm;          
          //For DOM -> model validation
          ngModel.$parsers.unshift(function(value) {
						 var valid = !form.firstName.$invalid && !form.middleName.$invalid && !form.lastName.$invalid;
             ngModel.$setValidity('fullname', valid);
             return value;
          });

          //For model -> DOM validation
          ngModel.$formatters.unshift(function(value) {
						var valid = !form.firstName.$invalid && !form.middleName.$invalid && !form.lastName.$invalid;						
             ngModel.$setValidity('fullname', valid);
             return value;
          });
					
					scope.$parent.$watchGroup([form.$name+'.firstName.$valid', form.$name+'.middleName.$valid', form.$name+'.lastName.$valid'], function(v){
						ngModel.$validate();
					});
      }
   };
});