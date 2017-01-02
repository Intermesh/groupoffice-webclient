'use strict';

/* Controllers */
GO.module('GO.Modules.GroupOffice.Log').
	controller('GO.Modules.GroupOffice.Log.MainController', [
		'$scope',
		'GO.Modules.GroupOffice.Log.Model.Entry',
		'$state',
		'GO.Core.Services.Application',
		'$timeout',
		function ($scope, Entry, $state, App, $timeout) {
		
		$scope.entry = new Entry();

		$scope.store = $scope.entry.getStore({
			returnProperties: "*,module[icon]"
		});
		
//		var date = new Date();
		
		$scope.period = {
			year: "",
			month: ""
		};

		function applyPeriod() {
			
			if(!$scope.period.year) {
				$scope.store.$loadParams.q = [];
				return;
			}
			
			
			
			var startDate = new Date();
			startDate.setFullYear($scope.period.year);
			startDate.setDate(1);
			startDate.setHours(0);
			startDate.setMinutes(0);
			
			if($scope.period.month !== "") {
				startDate.setMonth($scope.period.month);
			}
			
			var endDate = new Date(startDate);
			if($scope.period.month) {
				endDate.addMonths(1);
			}else
			{
				endDate.addYears(1);
			}
			
			var q = [
				['andWhere', ['>=', {'createdAt': startDate.toIntermeshApiFormat()}]],
				['andWhere', ['<', {'createdAt': endDate.toIntermeshApiFormat()}]]
			];
			
			$scope.store.$loadParams.q = q;
		}
		
		$scope.$watch('period', function(period, old) {			
			
			if(!period.year && old.year) {
				period.month = '';
			}	
				
			if(period.month && !period.year){
				period.year = new Date().getFullYear();
			}
			
					
			
			$timeout(function() {
				applyPeriod();
				$scope.store.load();			
			});
		}, true);
		
	
//		$scope.open = function(model) {
//			var tpl = App.entryTemplates[model.event.eventRecordType.name] ? App.entryTemplates[model.event.eventRecordType.name] : 'unknown';
//			
//			if(!model.clickedAt) {
//				model.clickedAt = new Date();
//				model.save();
//			}
//
//			tpl.onClick.call(this, model.event, $state);
//		}.bind(this);

//		$scope.selectEntry = function (module) {
//			$state.go("modules.module", {moduleId: module.id});
//		};

}]);