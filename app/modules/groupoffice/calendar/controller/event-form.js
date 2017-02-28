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
			$scope.model.delete(p || {}).then(function() {
				$mdDialog.cancel();
				$scope.eventStore.reload();
			});

		};

		$scope.save = function() {
			console.log($scope.model.event);
			if(!$scope.model.event.isRecurring) {
				return internalSave();
			}
			var p = {
				recurrenceId: $scope.model.event.recurrenceId.toIntermeshApiFormat()
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
				recurrenceId: $scope.model.event.recurrenceId.toIntermeshApiFormat()
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

		var addressStore = (new Resource('messages/recipients', '*', ['address'])).getStore();
		$scope.completeAttendees = function (input) {
			var deferred = $q.defer();
			addressStore.load({searchQuery: input}).then(function () {
				deferred.resolve(addressStore.items);
			});

			return deferred.promise;
		};
		$scope.addAttendee = function(ev) {
			if(ev.keyCode == 13) {
				$scope.model.event.attendees.push({email:ev.target.value, role:1,markDeleted: false});
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
		$scope.hasCalendars = function() {
			if(!$scope.model.groupId)
				return false;
			return $scope.userCalendars[$scope.model.groupId].length > 0;
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
			if($scope.model.event.startAt > $scope.model.event.endAt)
				$scope.model.event.endAt = $scope.model.event.startAt;
		};

		$scope.changeEndTime = function() {
			var end = $scope.model.event.endAt;
			if($scope.model.event.startAt > end) {
				$scope.model.event.startAt.setDate(end.getDate());
				$scope.model.event.startAt.setMonth(end.getMonth());
				$scope.model.event.startAt.setFullYear(end.getFullYear());
				console.log($scope.model.event.startAt);
			}
			if($scope.model.event.startAt > end) {
				$scope.model.event.startAt = new Date(+end);
			}
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