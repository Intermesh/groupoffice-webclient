'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Factories.Data.Store
 *
 * @description
 * A store holds multiple models for display in an ng-repeat item for example.
 * 
 * It's recommended to create a store from a model so that the model type is 
 * known in the store and the store is automatically updated when the model is
 * saved or deleted. See GO.Core.Factories.Data.Model#addStore
 * 
 * @example
 * Controller:
 * 
 * $scope.contact = new Contact();
 * $scope.store = $scope.contact.getStore(
 * 		{
 * 			returnProperties: "id,name,photo,company.name"
 * 		});
 * 
 *
 * @param {string} storeRoute The route to the controller. eg. "contacts"
 * @param {object=} loadParams Extra GET parameters for the store action
 * 
 */



angular.module('GO.Core').factory('GO.Core.Factories.Data.Store', [
	'$http',
	'GO.Core.Services.ServerAPI',
	'$injector',
	'$q',
	'$parse',
	'$mdToast',
	function ($http, ServerAPI, $injector, $q, $parse, $mdToast) {

		var Store = function (storeRoute, loadParams) {

//					var store = this;
//					$rootScope.$on('modelupdate', function(event, updatedModel) {
//						
//						console.log("Calling listener on store "+store.$storeRoute);
//						
//						if(updatedModel.$storeRoute === store.$storeRoute) {
//							store.updateModel(updatedModel);
//						}
//					});

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#$items
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type array
			 * @description The models in this store.
			 */
			this.items = [];

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#busy
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type boolean
			 * @description Set to true when the model is loading or saving.
			 */
			this.busy = false;

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#init
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type boolean
			 * @description Set to true when the store is loaded.
			 */
			this.init = false;


			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#searchQuery
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type string
			 * @description Search query to send to the server
			 */
			this.searchQuery = '';

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#restRoute
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type string
			 * @description The REST API route. eg. "/contacts"
			 * @link http://intermesh.io/php/docs/class-GO.Core.Http.Router.html
			 */
			this.$storeRoute = storeRoute;

			this._allRecordsLoaded = false;

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#loadParams
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type object
			 * @description Key value pair of GET parameters to pass on load.
			 */
			this.$loadParams = loadParams || {};

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#$lastLoadParams
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type object
			 * @description Key value pair of the last GET parameters that were passed on load.
			 */
			this.$lastLoadParams = {};


			this._indexChars = {};


			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Store#defaultLimit
			 * @propertyOf GO.Core.Factories.Data.Store
			 * @type int
			 * @description Limit's the store fetch request to this number of models.
			 */
			this.defaultLimit = 20;


			/**
			 * Set by the go-filter-collection directive.
			 * If set then this store will reload the filters when a store model is updated.
			 */
			this.$filterCollection = null;


//					$rootScope.$on('modelUpdated', function($event, model) {
//						
//						console.log('modelUpdated '+this.$storeRoute+ ' = '+model.$storeRoute);
//						if(model.$storeRoute == this.$storeRoute) {
//							this.updateModel(model);
//						}
//					}.bind(this));


			this.$selected = [];

			this.selectionCount = 0;

			this.$modelProto = null;
			this.$modelConstructorArgs = [];

			this.$index = null;

			this.$group = null;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#load
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Loads new items for the store.
		 *
		 * @param {object} params Key value pair of GET params for the request
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Store.prototype.load = function (params, dontReset) {
//			console.profile('load: '+this.$storeRoute);

			if (!dontReset) {

//						this.searchQuery = '';
				this._allRecordsLoaded = false;
				this.init = false;
			}

			this.busy = true;


			params = params || {};

			var defaultParams = {
				searchQuery: this.searchQuery,
				limit: this.defaultLimit,
				offset: 0
			};

			angular.extend(defaultParams, this.$loadParams, params);

			this.$lastLoadParams = angular.copy(defaultParams);




			this.promise = $http.get(ServerAPI.url(this.$storeRoute, defaultParams))
							.then(function (response) {

								var data = response.data;
								data.store = this;

								// @todo  response object validation !!!
								// @todo Set error msg if response object is incorrect
								if (!data.data) {
									console.log("Error respond data object do not use data item");
									console.log(data);
								}

								if (data.success) {

									//When there are less results then the limit we sent then we must have gotten the last results.
									this._allRecordsLoaded = data.data.length < defaultParams.limit;

									this.loadData(data.data, dontReset);

									this.busy = false;

									this.init = true;

									this.isEmpty = this.items.length === 0;
								}

//								console.profileEnd('load: '+this.$storeRoute);

								return {store: this, response: response};

							}.bind(this))
							.catch(function (e) {
								console.log(e);
							});



			return this.promise;
		};
		
		Store.prototype.loadIf = function() {
			if(this.promise){
				return this.promise;
			}
			
			return this.load();
		};



		Store.prototype._index = function (items) {
			if (!this.$index) {
				return items;
			}

			var getter = $parse(this.$index);

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];
				var propValue = getter(item);
				var index = propValue.substring(0, 1).toUpperCase();

				if (index != this._lastIndex) {
					item.$index = this._lastIndex = index;
				} else
				{
					item.$index = null;
				}
			}
			return items;
		};

		Store.prototype._group = function (items) {
			if (!this.$group) {
				return items;
			}

			var getter = $parse(this.$group);

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];

				var group = getter(item);

				if (group != this._lastGroup) {
					item.$group = this._lastGroup = group;
				} else
				{
					item.$group = null;
				}
			}
			return items;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#loadData
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Add an array of data to the store.
		 * 
		 * Example data:
		 * 
		 * <pre>
		 * [{attributeName: value}, {attributeName: value}]
		 * </pre>
		 * 
		 */
		Store.prototype.loadData = function (dataArray, append) {

			var items;

			if (append) {
				items = this.items;
			} else
			{
				items = [];
			}

			for (var i = 0, l = dataArray.length; i < l; i++) {

				var model = this._createModel();
				model.loadData(dataArray[i]);

				if (!this._isInItems(items, model)) { //filter out dupes					

					items.push(model);
				}
			}

			items = this._index(items);
			items = this._group(items);

			this.items = items;
			if (this.onLoad)
				this.onLoad();
		};

		Store.prototype._getPrimaryKeyFromObject = function (model) {
			//extract primary key
			var keys = {};
			for (var ki = 0, kl = model.$keys.length; ki < kl; ki++) {
				keys[model.$keys[ki]] = model[model.$keys[ki]];
			}

			return keys;
		};

		Store.prototype._isInItems = function (items, model) {

			//no model known. Just ignore then.
			if (!this.$modelProto || this.skipFilterDupes) {
				this.skipFilterDupes = true;
				return false;
			}

			var keys = this._getPrimaryKeyFromObject(model);

			for (var i = 0, l = items.length; i < l; i++) {

				var match = true;
				for (var attributeName in keys) {
					if (items[i][attributeName] != keys[attributeName]) {
						match = false;
						break;
					}
				}

				if (match) {
					console.log("Duplicate item in store with: ");
					console.log(model);
					return true;
				}
			}


			return false;
		};


		Store.prototype._createModel = function () {

			var baseParams = {};
			if (this.$loadParams.returnProperties) {
				baseParams.returnProperties = this.$loadParams.returnProperties;
			}


			if (!this.$modelProto) {
				var Model = $injector.get("GO.Core.Factories.Data.Model");
				this.$modelProto = Model.prototype;
			}

			//Store.prototype.$modelProto = Model.prototype;

			var model = Object.create(this.$modelProto);
			model.constructor.apply(model, this.$modelConstructorArgs);
			model.addStore(this);
			model.$baseParams = baseParams;

			return model;
		};



		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#nextPage
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Loads the next page for the store
		 *
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Store.prototype.nextPage = function () {

			if (!this.shouldLoad())
				return false;

			return this.load({
				offset: this.items.length
			}, true);
		};

		//for md-virtual-repeat
		Store.prototype.getItemAtIndex = function (index) {
			if (!this.items[index]) {
				this.nextPage();
				return null;
			}

//					console.log(this.items[index]);

			return this.items[index];
		};

		Store.prototype.getLength = function () {

			if (!this.init) {
				return 0;
			}

			if (!this._allRecordsLoaded) {
				return this.items.length + 5;
			} else
			{
				return this.items.length;
			}
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#reload
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Reload the entire store
		 *
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Store.prototype.reload = function () {

			var params = this.$lastLoadParams;
			params.limit = this.items.length < this.defaultLimit ? this.defaultLimit : this.items.length;
			//this.reset();
			params.offset = 0;

			return this.load(params);
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#reset
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Reset the store to an empty state
		 */
		Store.prototype.reset = function (keepSearch) {
			if (!keepSearch) {
				this.searchQuery = '';
			}
			this.items = [];
			this._allRecordsLoaded = false;
			this.init = false;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#shouldLoad
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Reset the store to an empty state
		 *
		 * @returns {boolean} Returns false if the store should not be loaded. eg. when it's busy or loaded completely.
		 */
		Store.prototype.shouldLoad = function () {
			var ret = this.init && !this.busy && !this._allRecordsLoaded;

			return ret;
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#search
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Loads the store but passes this.searchQuery
		 *
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Store.prototype.search = function () {
			this.reset(true);
			return this.load({}, true);
		};

//				Store.prototype.searchListener = function($event) {
//					if ($event.keyCode === 13) {
//						this.search();
//					}
//				};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#remove
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Removes a record
		 *
		 * @param {int} index Index of record to remove
		 *
		 */
		Store.prototype.remove = function (index) {
			this.total--;
			return this.items.splice(index, 1);
		};




		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#findIndexByAttribute
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a record index by attribute name
		 *
		 * @param {string} attributeName Name of the attribute
		 * @param {mixed} value Value of the attribute
		 *
		 * @returns {int} Index of record
		 */
		Store.prototype.findIndexByAttribute = function (attributeName, value) {

			for (var i = 0, l = this.items.length; i < l; i++) {
				if (this.items[i][attributeName] == value) {
					return i;
				}
			}

			return -1;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#findIndexesByAttribute
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a record index by attribute name
		 *
		 * @param {string} attributeName Name of the attribute
		 * @param {mixed} value Value of the attribute
		 *
		 * @returns {array} Index of record
		 */
		Store.prototype.findIndexesByAttribute = function (attributeName, value) {

			var indexes = [];

			for (var i = 0, l = this.items.length; i < l; i++) {
				if (this.items[i][attributeName] == value) {
					indexes.push(i);
				}
			}
			;

			return indexes;
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#findModelByAttribute
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a record  by attribute name
		 *
		 * @param {string} attributeName Name of the attribute
		 * @param {mixed} value Value of the attribute
		 *
		 * @returns {Model} The model found or false on failure
		 */
		Store.prototype.findModelByAttribute = function (attributeName, value) {

			var i = this.findIndexByAttribute(attributeName, value);

			if (i === false) {
				return false;
			} else
			{
				return this.items[i];
			}
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#findModelsByAttribute
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a record  by attribute name
		 *
		 * @param {string} attributeName Name of the attribute
		 * @param {mixed} value Value of the attribute
		 *
		 * @returns {array} The models found or false on failure
		 */
		Store.prototype.findModelsByAttribute = function (attributeName, value) {


			var indexes = this.findIndexesByAttribute(attributeName, value);
			var models = [];

			for (var i = 0, l = indexes.length; i < l; i++) {
				models.push(this.items[indexes[i]]);
			}

			return models;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#find
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a records by attribute key value
		 *
		 * @param {object} keys are attribute names and values are the attribute values
		 *
		 * @returns {array} The models found or false on failure
		 */
		Store.prototype.find = function (attr) {

			var results = [];
			for (var i = 0, l = this.items.length; i < l; i++) {

				var match = true;
				for (var attributeName in attr) {
					if (this.items[i][attributeName] !== attr[attributeName]) {
						match = false;
						break;
					}
				}

				if (match) {
					results.push(this.items[i]);
				}
			}

			return results;
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#find
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a records by attribute key value
		 *
		 * @param {object} keys are attribute names and values are the attribute values
		 *
		 * @returns {array} The models found or false on failure
		 */
		Store.prototype.findIndexes = function (attr) {

			var results = [];
			for (var i = 0, l = this.items.length; i < l; i++) {

				var match = true;
				for (var attributeName in attr) {
					if (this.items[i][attributeName] !== attr[attributeName]) {
						match = false;
						break;
					}
				}

				if (match) {
					results.push(i);
				}
			}

			return results;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#updateModel
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Finds a given model in the store and updates it. If the model wasn't
		 * found then it will be added.
		 * 
		 * @param {GO.Core.Factories.Data.Model} updatedModel The model that was updated
		 *
		 * @returns {array} The models found or false on failure
		 */
		Store.prototype.updateModel = function (updatedModel) {
			var index = this.findIndexByAttribute('id', updatedModel.id);
			if (index > -1) {
				angular.extend(this.items[index], updatedModel);
			} else
			{
				this.items.push(updatedModel);
			}

			if (this.$filterCollection) {
				this.$filterCollection.load();
			}
		};





		Store.prototype.select = function (indexes) {

			var selected = [];
			var item;


			angular.forEach(this.items, function (item) {
				item.$selected = false;
			});

			if (indexes) {

				for (var i = 0, l = indexes.length; i < l; i++) {

					item = this.items[indexes[i]];
					if (!item.$selected) {
						selected.push(item);
						item.$selected = true;
					}
				}
			}

			this.$selected = selected;

			this.selectionCount = this.$selected.length;
		};

		Store.prototype.getSelectedIndexes = function () {
			var indexes = [];
			for (var i = 0, l = this.items.length; i < l; i++) {
				if (this.items[i].$selected) {
					indexes.push(i);
				}
			}

			return indexes;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Store#deleteSelected
		 * @methodOf GO.Core.Factories.Data.Store
		 * @description
		 * Deletes all selected models.
		 * 
		 * @param {Function} callback The callback is called after the selected models where deleted.
		 * @example 
		 * 
		 * store.deleteSelected(function(selected) {
		 *		
		 * });
		 */
		Store.prototype.deleteSelected = function () {


			if (this.$selected.length) {
				this.busy = true;

				var deletes = [];

				angular.forEach(this.items, function (model, index) {
					if (model.$selected) {
						deletes.push({
							className: model.className,
							pk: model.pk()
						});
					}
				}.bind(this));


				$http.post(ServerAPI.url('selections'), {
					method: 'delete',
					data: deletes
				}).then(function (response) {
					
					var soft = false;

					angular.forEach(response.data, function (subresponse) {
						//no soft delete
						if (angular.isUndefined(subresponse.data.deleted)) {
							var index = this.findIndexByAttribute('id', subresponse.data.id);
							this.items.splice(index, 1);
						} else
						{
							soft = true;
							this.updateModel(subresponse.data);							
						}
					}.bind(this));


					if(soft) {
						this._showUndoDelete(deletes);
					}
					
					this.select();

				}.bind(this));
			}			
		};
		
		
		Store.prototype._showUndoDelete = function (deletes) {
				var toast = $mdToast.simple()
								.textContent(deletes.length + ' items deleted')
								.action('UNDO')
								.hideDelay(0)
								.highlightAction(true)
								.highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
								.position('bottom left');

				$mdToast.show(toast).then(function (response) {
					if (response == 'ok') {
						$http.post(ServerAPI.url('selections'), {
							method: 'undelete',
							data: deletes
						}).then(function (response) {

							angular.forEach(response.data, function (subresponse) {
						
									this.updateModel(subresponse.data);
								
							}.bind(this));
						}.bind(this));
					}
				}.bind(this));
				
				var hide = function() {
					$mdToast.hide();
					angular.element(document.body).off('click', hide);
				};
				angular.element(document.body).on('click', hide);
			};



		Store.prototype.orderChanged = function (event) {
			var up = event.source.index > event.dest.index;

			var droppedOnIndex = up ? event.dest.index + 1 : event.dest.index - 1;

			var draggedModel = event.source.itemScope.modelValue;
			var droppedModel = event.source.sortableScope.modelValue[droppedOnIndex];

			draggedModel.sortOrder = droppedModel.sortOrder;

			draggedModel.save().then(function () {
				this.reload();
			}.bind(this));
		};

		return Store;

	}]);
