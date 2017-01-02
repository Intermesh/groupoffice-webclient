'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Services.Dialog
 
 *
 * @description
 * Create a dialog using a service
 * Based on: http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/
 *
 * @example Controller function
 * 
 * $scope.edit = function (band) {
 *
 *	if (!band) {
 *		band = new Band();
 *		band.addStore($scope.store);
 *	}
 *
 *	Dialog.show({
 *		editModel: band,
 *		templateUrl: 'ux/tutorial/modules/groupoffice/bands/views/band-edit.html',
 *
 *		//add controller here
 *		controller: 'UX.Tutorial.Modules.Bands.Controller.BandEdit',
 *		
 *		//Inject extra values. Just a dummy example here
 *		inputs: {
 *			foo: "bar"
 *		}
 *
 *	}).then(function (dialog) {
 *		dialog.close.then(function (band) {
 *			if (band) {
 *				$state.go("bands.band", {bandId: band.id});
 *			}
 *		});
 *	});
 * };
 * 
 * @example template 
 * <form layout="column" name="bandForm" go-submit="save()" go-server-errors="model.validationErrors" novalidate>
 *	
 *	<md-toolbar>
 *		<div class="md-toolbar-tools">
 *			<md-button type="button" class="md-icon-button" ng-click="cancel()">
 *				<md-tooltip>{{::"Close"| goT}}</md-tooltip>
 *				<md-icon>chevron_left</md-icon>
 *			</md-button>
 *
 *			<span flex></span>
 *			<md-button type="submit" class="md-icon-button">
 *				<md-tooltip>{{::"Save"| goT}}</md-tooltip>
 *				<md-icon>check</md-icon>
 *			</md-button>
 *		</div>
 *	</md-toolbar>
 *
 *	<md-content class="md-padding" flex>
 *
 *		<md-input-container  class="md-block">
 *			<label>{{::"Name"| goT}}</label>
 *			<input ng-model="model.name" name="name" required go-autofocus>
 *			<div ng-messages="modelForm.name.$error" role="alert">
 *	 			<div ng-message="required">
 *				{{::"This field is required"| goT}}
 *				</div>
 *			</div>
 *		</md-input-container>
 * 
 * 
 * @example controller
 * 
 * GO.module('UX.Tutorial.Modules.Bands').
 *				controller('UX.Tutorial.Modules.Bands.Controller.BandEdit', [
 *					'$scope',
 *					'close', // You can inject the 'close' function. When called the dialog closes.
 *					'read', // You can inject the 'read' promise. This is resolved when the passed 'editModel' is done with it's read request to the server.
 *					
 *					'foo', // Manually injected variable. The value is "bar" in this example.
 *					function ($scope, close, read, foo) {
 *						
 *						read.then(function(result) {
 *							
 *							if(result.model.isNew()) {
 *								result.model.setAttributes({
 *									name: 'Default'
 *								});
 *							}
 *						});
 *						
 *					}]);
 * 
 * }]);
 */
angular.module('GO.Core').factory('GO.Core.Services.Dialog', [
	'$document',
	'$compile',
	'$controller',
	'$http',
	'$rootScope',
	'$q',
	'$templateCache',
	'$mdDialog',
	'GO.Core.Providers.Translate',
	function ($document, $compile, $controller, $http, $rootScope, $q, $templateCache, $mdDialog, Translate) {

		//  Get the body of the document, we'll add the modal to this.
		var body = $document.find('body');

		function Dialog() {

			var self = this;

			var wrapTemplate = function (tpl) {
				//closing scope variable is set by close function further down
				return '<section tabindex="1" class="modal" ng-keypress="keypress($event);"><div class="backdrop"></div><div class="dialog" ng-cloak>' + tpl + '</div></section>';
			};

			//  Returns a promise which gets the template, either
			//  from the template parameter or via a request to the
			//  template url parameter.
			var getTemplate = function (template, templateUrl) {
				var deferred = $q.defer();
				if (template) {
					deferred.resolve(wrapTemplate(template));
				} else if (templateUrl) {
					// check to see if the template has already been loaded
					var cachedTemplate = $templateCache.get(templateUrl);
					if (cachedTemplate !== undefined) {
						deferred.resolve(wrapTemplate(cachedTemplate));
					}
					// if not, let's grab the template for the first time
					else {
						$http({method: 'GET', url: templateUrl, cache: true})
										.then(function (result) {
											// save template into the cache and return the template


											$templateCache.put(templateUrl, result.data);
											deferred.resolve(wrapTemplate(result.data));
										})
										.catch(function (error) {
											deferred.reject(error);
										});
					}
				} else {
					deferred.reject("No template or templateUrl has been specified.");
				}
				return deferred.promise;
			};

			self.show = function (options) {

				//  Create a deferred we'll resolve when the modal is ready.
				var deferred = $q.defer();

				//  Validate the input parameters.
				var controllerName = options.controller;
				if (!controllerName) {
//									deferred.reject("No controller has been specified.");
//									return deferred.promise;
					controllerName = function () {};
				}

				//  If a 'controllerAs' option has been provided, we change the controller
				//  name to use 'as' syntax. $controller will automatically handle this.
				if (options.controllerAs) {
					controllerName = controllerName + " as " + options.controllerAs;
				}

				//  Get the actual html of the template.
				getTemplate(options.template, options.templateUrl)
								.then(function (template) {

									//  Create a new scope for the modal.
									var modalScope = $rootScope.$new();

									modalScope.keypress = function (e) {
										if (e.keyCode == 27) { //Escape pressed
											inputs.close();
										}
									};

									//  Create the inputs object to the controller - this will include
									//  the scope, as well as all inputs provided.
									//  We will also create a deferred that is resolved with a provided
									//  close function. The controller can then call 'close(result)'.
									//  The controller can also provide a delay for closing - this is
									//  helpful if there are closing animations which must finish first.
									var closeDeferred = $q.defer();
									var inputs = {
										$scope: modalScope,
										close: function (result) {
//											if (delay === undefined || delay === null)
//												delay = 500;

											modalScope.closing = true;

											//  Resolve the 'close' promise.
											closeDeferred.resolve(result);

//											$timeout(function () {


												//  We can now clean up the scope and remove the element from the DOM.
												modalScope.$destroy();
												modalElement.remove();

												//  Unless we null out all of these objects we seem to suffer
												//  from memory leaks, if anyone can explain why then I'd 
												//  be very interested to know.
												inputs.close = null;
												deferred = null;
												closeDeferred = null;
												dialog = null;
												inputs = null;
												modalElement = null;
												modalScope = null;
//											}, delay);
										}
									};

									//  If we have provided any inputs, pass them to the controller.
									if (options.inputs) {
										for (var inputName in options.inputs) {
											inputs[inputName] = options.inputs[inputName];
										}
									}

									if (options.editModel) {
										self.setupEditing(options.editModel, inputs);
									}

									//  Create the controller, explicitly specifying the scope to use.
									var modalController = $controller(controllerName, inputs);


									//  Parse the modal HTML into a DOM element (in template form).
									var modalElementTemplate = angular.element(template);

									//  Compile then link the template element, building the actual element.
									//  Set the $element on the inputs so that it can be injected if required.
									var linkFn = $compile(modalElementTemplate);
									var modalElement = linkFn(modalScope);
									inputs.$element = modalElement;



									//  Finally, append the modal to the dom.
									if (options.appendElement) {
										// append to custom append element
										options.appendElement.append(modalElement);
									} else {
										// append to body when no custom append element is specified
										body.append(modalElement);
									}

									//  We now have a modal object...
									var dialog = {
										controller: modalController,
										scope: modalScope,
										element: modalElement,
										close: closeDeferred.promise
									};

									//add the read promise for editing
									if (inputs.read) {
										dialog.read = inputs.read;
									}

									//focus the element
									modalElement[0].focus();

									//  ...which is passed to the caller via the promise.
									deferred.resolve(dialog);

								})
								.catch(function (error) {
									deferred.reject(error);
								});

				return deferred.promise;
			};

			self.setupEditing = function (editModel, inputs) {


				inputs.$scope.model = editModel;

				inputs.$scope.watchModel = function() {
					inputs.$scope.watchedModel = angular.copy(inputs.$scope.model);
				};

				inputs.$scope.cancel = function () {
					if (inputs.$scope.watchedModel && !angular.equals(inputs.$scope.watchedModel, inputs.$scope.model)) {
//										console.log("Modifications: ");
//										console.log(editModel.getModifiedAttributes());

						var confirm = $mdDialog.confirm()
										.title(Translate.t('Save changes'))
										.textContent(Translate.t('Do you want to save your changes?'))
										.ariaLabel('Confirm')
										.ok(Translate.t("Save"))
										.cancel(Translate.t("Discard"));

						$mdDialog.show(confirm).then(function () {

							return inputs.$scope.save();
						}, function () {
							editModel.reset();
							inputs.close();
						});

					} else
					{
						editModel.reset();
						inputs.close();
					}

				};


				inputs.$scope.save = function () {

					return editModel.save()
									.then(function (result) {
										return inputs.close(editModel);
									});
				};

				//put the read promise in the inputs so it can be injected if required.
				inputs.read = inputs.$scope.model.readIf(inputs.$scope.model.id || 0);
//								console.log(inputs);
			};

		}



		return new Dialog();
	}]);