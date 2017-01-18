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

		$scope.save = function() {
			function internalSave() {
				$scope.model.save().then(function(){
					$mdDialog.hide();
					$scope.$parent.eventStore.reload();
				});
			}
			var confirm = $mdDialog.confirm()
							.title('Herhalende afspraak wijzigen')
							.textContent("Wil u ook alle volgende afspraken wijzigen of alleen deze?")
							//.targetEvent(ev)
							.ok('Deze en alle volgende')
							.cancel('Alleen deze afspraak');
			$mdDialog.show(confirm).then(function() {
				$scope.model.changeOccurrence = 1;
				internalSave();
			},function() {
				$scope.model.changeOccurrence = 2;
				internalSave();
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
			if(!$scope.model.userId)
				return true;
			return $scope.$parent.userCalendars[$scope.model.userId].length > 0;
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

		$scope.changeStartTime = function(event) {
			if($scope.model.event.startAt > $scope.model.event.endAt)
				$scope.model.event.endAt = $scope.model.event.startAt;
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