'use strict';

GO.module('GO.Modules.GroupOffice.Calendar').
controller('GO.Modules.GroupOffice.Calendar.EventForm', [
	'$scope',
	'$mdDialog',
	'$q',
	'GO.Core.Services.ServerAPI',
	'GO.Core.Factories.Data.Resource',
	function ($scope, $mdDialog, $q, ServerAPI, Resource) {
		$scope.color = GO.Calendar.util.color;
		$scope.model = $scope.$parent.model;

		function internalSave(p) {
			$scope.model.save(p || {}).then(function(){
				$mdDialog.hide();
				$scope.eventStore.reload();
			});
		}
		function internalDelete(p) {
			$scope.model.delete(p || {calendarId:$scope.model.calendarId}).then(function() {
				$mdDialog.cancel();
				$scope.eventStore.reload();
			});

		};

		$scope.save = function() {
			if(!$scope.model.event.isRecurring) {
				return internalSave();
			}
			var p = {
				recurrenceId: $scope.model.recurrenceId
			};
			if($scope.model.event.isException) {
				p.single = true;
				return internalSave(p);
			}
			var confirm = $mdDialog.confirm()
				.title('Herhalende afspraak wijzigen')
				.textContent("Wil u ook alle volgende afspraken wijzigen of alleen deze?")
				.ok('Deze en alle volgende')
				.cancel('Alleen deze afspraak');
			$mdDialog.show(confirm).then(function() {
				p.single = false;
				internalSave(p);
			},function() {
				p.single = true;
				internalSave(p);
			});
			return confirm;
		};

		$scope.delete = function() {
			
			if(!$scope.model.event.isRecurring) {
				return internalDelete();
			}
			var p = {
				recurrenceId: $scope.model.recurrenceId
			};
			if($scope.model.event.isException) {
				p.single = true;
				return internalDelete(p);
			}
			var confirm = $mdDialog.confirm()
				.title('Verwijder herhalende afspraak')
				.textContent("Wil u ook alle volgende afspraken verwijderen of alleen deze?")
				.ok('Deze en alle volgende')
				.cancel('Alleen deze afspraak');
			$mdDialog.show(confirm).then(function() {
				p.single = false;
				internalDelete(p);
			},function() {
				p.single = true;
				internalDelete(p);
			});
			
		};

		$scope.selectedItem;
		$scope.cancel = function() { $mdDialog.cancel(); };

		var addressStore = (new Resource('recipients', '*', ['address'])).getStore();
		$scope.completeAttendees = function (input) {
			var deferred = $q.defer();
			addressStore.load({searchQuery: input}).then(function () {
				deferred.resolve(addressStore.items);
			});

			return deferred.promise;
		};
		$scope.addAttendee = function(ev) {
			if(ev.keyCode == 13) {
				var exists = false;
				angular.forEach($scope.model.event.attendees, function(value, key) {
					if(value.email == ev.target.value)
						exists = true;
				});
				if(!exists) {
					$scope.model.event.attendees.push({email:ev.target.value, role:1,markDeleted: false});
				}
				ev.preventDefault();
				ev.target.value = '';
			}
		};
		$scope.removeAttendee = function(email) {
			for(var a in $scope.model.event.attendees) {
				if($scope.model.event.attendees[a].email === email) {
					$scope.model.event.attendees[a].markDeleted = true;
				}
			}
		};

		$scope.addAlarm = function(event) {
			var target = event.target;
			if(target.tagName == 'SPAN')
				target = target.parentElement;
			$scope.model.alarms.push({trigger:''});
			setTimeout(function(){
				angular.element(target.previousElementSibling).triggerHandler('click');
			},100); // wait until watch is done watching
		};
		$scope.selectAlarm = function(alarm, index) {
			if(alarm.trigger === '0') { //remove
				return $scope.model.alarms.splice(index, 1);
			}
			alarm.relativeTo = 1;
		};
		$scope.answer = function(responseStatus) {
			$scope.model.responseStatus = responseStatus;
		};

		$scope.changeStartTime = function() {
			var start = $scope.model.start;
			console.log(start);
			console.log($scope.model.end);
			if(start > $scope.model.end) {
				$scope.model.end.setFullYear(start.getFullYear());
				$scope.model.end.setMonth(start.getMonth());
				$scope.model.end.setDate(start.getDate());
			}
			if(start > $scope.model.end) {
				$scope.model.end = new Date(+start);
			}
		};

		$scope.changeEndTime = function() {
			var end = $scope.model.end;
			if($scope.model.start > end) {
				$scope.model.start.setFullYear(end.getFullYear());
				$scope.model.start.setMonth(end.getMonth());
				$scope.model.start.setDate(end.getDate());
			}
			if($scope.model.start > end) {
				$scope.model.start = new Date(+end);
			}
		};

		$scope.attachmentDownload = function(blobId) {
			ServerAPI.download(blobId);
		};
		$scope.attachmentThumb = function(blobId) {
			return ServerAPI.thumbUrl(blobId, {w:132, h:88});
		};


		$scope.uploadSuccess = function($file, $message) {
			var response = angular.fromJson($message);
			var att = {blobId:response.data.blobId, name: response.data.name, markDeleted:false};
			$scope.model.event.attachments.push(att);
		};
		$scope.removeAttachment = function(index) {
			$scope.model.event.attachments[index].markDeleted = true;
		};
		$scope.flowInit = ServerAPI.getFlowInit();

	}
]);