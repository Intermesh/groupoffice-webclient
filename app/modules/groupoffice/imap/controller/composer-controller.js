'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Imap').controller('GO.Modules.GroupOffice.Imap.Controller.Composer', [
	'$scope',
	'GO.Core.Factories.Data.Resource',
	'$http',
	'close',
	'account',
	'attributes',
	'GO.Core.Services.Mask',
	'GO.Core.Services.ServerAPI',
	'$q',
	'read',
	'GO.Modules.GroupOffice.Messages.Services.AccountStore',
	'$timeout',
	function ($scope, Resource, $http, close, account, attributes, Mask, ServerAPI, $q, read, accountStore, $timeout) {

		//put modal close function in scope for close button
		$scope.close = close;
		$scope.model.accountId = account.id;					
		$scope.accountStore = accountStore;
		
		$scope.signatures = account.signatures;
		
		$scope.accountStore.loadIf();
		
		
		read.then(function () {
			
				
			$scope.model.setAttributes(attributes);			
			$scope.model.accountId = account.id;	
		
			$scope.to = attributes && attributes.to ? attributes.to : angular.copy($scope.model.to);
			$scope.cc = attributes && attributes.cc ? attributes.cc : angular.copy($scope.model.cc);
			$scope.bcc = attributes && attributes.bcc ? attributes.bcc : angular.copy($scope.model.bcc);
		

			//If we're replying the server will determine the thread based on the accountId
			if (!$scope.model.thread) {
				$scope.model.thread = {accountId: $scope.accountId};
			}
			
//			if($scope.model.isNew()) {
				updateSignature($scope.settings.signatureIndex);
//			}

//			$scope.model.clearModified();
		});
		
		

		var recipient = new Resource('messages/recipients', '*', ['address']);
		var recipientStore = recipient.getStore();
		$scope.getRecipients = function (input) {

			var deferred = $q.defer();

			recipientStore.load({searchQuery: input}).then(function () {
				deferred.resolve(recipientStore.items);
			});

			return deferred.promise;
		};


		$scope.addRecipient = function (field, chip, index) {
			if (!chip.address) {
				$scope.model[field][index] = {address: chip, personal: chip};			
			}else
			{
				delete $scope.model[field][index].full;
			}
		};
		
		


		var origSave = $scope.save;
		
		$scope.send = function() {
			$scope.model.type = 5; //outbox
			return $scope.save();
		};

		$scope.save = function () {			
			GO.markArrayDeleted(['id'], $scope.model.$oldAttributes.to, $scope.model.to);
			GO.markArrayDeleted(['id'], $scope.model.$oldAttributes.cc, $scope.model.cc);
			GO.markArrayDeleted(['id'], $scope.model.$oldAttributes.bcc, $scope.model.bcc);
			return origSave();
		};


		$scope.settings = {
			signatureIndex: -1,
			showCc: false,
			showBcc: false
		};

		function updateSignature(index, oldIndex) {
			
			

//			if (!$scope.model.message) {
//				return;
//			}			

			if(!$scope.model.body) {
				$scope.model.body = "";
			}

			var oldSignature = oldIndex !== null && oldIndex > -1 ? account.signatures[oldIndex].signature : "";
			var newSignature = index !== null && index > -1 ? account.signatures[index].signature : "";

			if (oldSignature && $scope.model.body.indexOf(oldSignature) > -1) {
				$scope.model.body = $scope.model.body.replace(oldSignature, newSignature);
			} else
			{
				$scope.model.body = newSignature + $scope.model.body;
			}
			
			
		}

		

		if (account.signatures.length) {
			$scope.settings.signatureIndex = 0;
		}else
		{
			$scope.settings.signatureIndex = null;
		}
		
		$scope.$watch('settings.signatureIndex', updateSignature);



		// FILE UPLOAD
		$scope.flowInit = ServerAPI.getFlowInit();

		$scope.uploadSuccess = function ($file, $message) {
			var result = angular.fromJson($message);
			//$file.serverFile = result.data.name;
			$scope.model.attachments.push({
				blobId: result.data.blobId,
				name: $file.name
			});
		};

		$scope.removeAttachment = function (index) {
			$scope.model.attachments.splice(index, 1);
		};


		$scope.onImagePaste = function (blob, editor) {
			var form = new FormData();
			form.append("file", blob, blob.type.replace(/\//, '.'));

			$http.post(ServerAPI.url('upload'), form, {
				transformRequest: angular.identity, //this will pass the formdata object as is.
				headers: {'Content-Type': undefined} //Content-Type will be filled by the form
			}).then(function (result) {
				
				var url = ServerAPI.url('download/'+result.data.data.blobId);
				$scope.model.attachments.push({
					src: url,
					blobId: result.data.data.blobId,
					name: result.data.data.name
				});

				editor.composer.commands.exec("insertImage", {src: url, alt: result.data.data.name});
			});
		};


		//When account changes then change the composer
		$scope.$watch('model.accountId', function(newValue, oldValue) {
			if(newValue !== oldValue) {				
				$timeout(function() {
					close();
					updateSignature(null, $scope.settings.signatureIndex);
					$scope.accountStore.findModelByAttribute('id', newValue).getAccountModel().compose({}, $scope.model);
				});
			}
		});
		


	}]);

				