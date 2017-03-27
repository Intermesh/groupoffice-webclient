angular.module('GO.Modules.GroupOffice.Cron').controller('GO.Modules.GroupOffice.Cron.Controller.Main', [
	'$scope',
	'GO.Modules.GroupOffice.Cron.Model.Job',
	'GO.Core.Services.Dialog',
	function ($scope, Job, Dialog) {
		$scope.store = (new Job).getStore();

		$scope.store.load();
		
		
		$scope.runNow = function(job) {
			job.enabled = true;
			job.nextRun = new Date();
			job.save();
		};

		$scope.edit = function (job) {

			if (!job) {
				job = new Job();
			}


			Dialog.show({
				editModel: job,
				templateUrl: 'modules/groupoffice/cron/view/edit.html',
				controller: 'GO.Modules.GroupOffice.Cron.Controller.Edit'
			}).then(function (dialog) {
				dialog.close.then(function (job) {
					
				});
			});
		};

	}]);

