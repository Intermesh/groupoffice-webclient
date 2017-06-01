	'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Factories.Data.Model
 *
 * @description
 * A model is an item that can be saved and loaded from the server. A user for example.
 * 
 * All properties that do no start with a _ or $ char are sent as model attributes to the server.
 * 
 * If you want to implement Read-Only properties to the model, then you can use the $ char before the attribute.
 * 
 * @example
 * 
 *	Participant.prototype.loadData = function (data) {
 *			this.$parent.loadData.call(this, data);
 *			
 *			var nameArr = [this.firstName, this.lastName];
 *			// Notice that fullName = prefixed with a $
 *			this.$fullName = nameArr.join(' ');
 *	}
 * 
 * 
 * We recommend that you extend this model:
 * 
 * @example
 *
 * angular.module('UX.Tutorial.Modules.Bands').
 *	factory('UX.Tutorial.Modules.Bands.Model.Band', [
 *			'GO.Core.Factories.Data.Model', 
 *			function (Model) {
 *
 *			var Band = GO.extend(Model, function () {
 *				this.$parent.constructor.call(this, arguments);
 *			});
 *			
 *			Band.prototype.getStoreRoute = function() {
 *				return 'bands';
 *			}
 *
 *			return Band;
 *		}]);
 *
 * @param {string} storeRoute The server route to the RESTfull API. eg. '/contacts'
 * @param {object=} baseParams GET parameters for each request
 */
angular.module('GO.Core').factory('GO.Core.Factories.Data.Model', [
	'$http',
	'$q',
	'$timeout',
	'GO.Core.Services.ServerAPI',
	'GO.Core.Factories.Data.Store',
	'$rootScope',
	function ($http, $q, $timeout, ServerAPI, Store, $rootScope) {

		var Model = function (constructorArgs) {			
			
			this.$constructorArgs = constructorArgs;
			
			this.$oldAttributes = {};

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Model#$baseParams
			 * @propertyOf GO.Core.Factories.Data.Model
			 * @type object
			 * @description Key value pair of GET parameters to pass on load.
			 */
			//this.$baseParams = {};

			/**
			 * @ngdoc property
			 * @name GO.Core.Factories.Data.Model#$busy
			 * @propertyOf GO.Core.Factories.Data.Model
			 * @type boolean
			 * @description Set to true when the model is loading or saving.
			 */
			this.$busy = false;

			this.$lastReadParams = {};

			this.$baseParams = {};
			
			this.init();
		};
		
		Model.prototype.$returnProperties = "*";
		/**
			* @ngdoc method
			* @name GO.Core.Factories.Data.Model#getStoreRoute
			* @propertyOf GO.Core.Factories.Data.Model
			* @type string
			* @description The API route to the server. eg. "contacts"
			*/
		Model.prototype.getStoreRoute = function() {
			throw "Please implement getStoreRoute()";
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getCreateRoute
		 * @propertyOf GO.Core.Factories.Data.Model
		 * @type string
		 * @description The API route to the server. eg. "contacts"		 
		 */
		Model.prototype.getCreateRoute = function () {
			return this.getStoreRoute();
		};
		
		
		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getReadRoute
		 * @propertyOf GO.Core.Factories.Data.Model
		 * @type string
		 * @description The API route to the server. eg. "contacts/1"		 
		 */
		Model.prototype.getReadRoute = function () {
			return this._appendKeys(this.getCreateRoute());
		};
		
		
		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getUpdateRoute
		 * @propertyOf GO.Core.Factories.Data.Model
		 * @type string
		 * @description The API route to the server. eg. "contacts/1"		 
		 */
		Model.prototype.getUpdateRoute = function () {
			return this._appendKeys(this.getCreateRoute());
		};
		
		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getDeleteRoute
		 * @propertyOf GO.Core.Factories.Data.Model
		 * @type string
		 * @description The API route to the server. eg. "/contacts/1"
		 */
		Model.prototype.getDeleteRoute = function () {
			return this._appendKeys(this.getCreateRoute());
		};

		/**
		 * @ngdoc property
		 * @name GO.Core.Factories.Data.Model#$keys
		 * @propertyOf GO.Core.Factories.Data.Model
		 * @type array
		 * @description
		 * The primary key
		 */
		Model.prototype.$keys = ['id'];

		Model.prototype.init = function () {
		};

		Model.prototype._getBaseParams = function () {
			var params = angular.copy(this.$baseParams);
			params.returnProperties = this.$returnProperties;
			return params;
		};

		Model.prototype._appendKeys = function (route) {
			for (var i in this.$keys) {
				if (this[this.$keys[i]] + "" === "" || typeof(this[this.$keys[i]]) == "undefined") {
					break;
				}
				route += '/' + encodeURIComponent(this[this.$keys[i]]);
			}

			return route;
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#delete
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Delete the model on the server
		 
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Model.prototype.delete = function (getParams) {

			var deferred = $q.defer();
			var params = this._getBaseParams();

			if (getParams) {
				angular.extend(params, getParams);
			}

//					Utils.promiseSuccessDecorator(deferred.promise);

			this.$busy = true;

			var url = ServerAPI.url(this.getDeleteRoute(), params);
			$http.delete(url).then(function (response) {

				if (response.data.success) {
					var data = response.data.data;

					if (data && data.validationErrors && data.validationErrors.length) {

//										this.validationErrors = data.validationErrors;

						deferred.reject({model: this, response: response.data});
					} else {

						if (data) {
							this.loadData(data);
						}

						//SoftDeleteTrait has a 'deleted' attribute.
						if (typeof (this.deleted) !== 'undefined') {
							this.deleted = true;
							this.$oldAttributes.deleted = true;
						} else
						{
							for (var i in this.$keys) {
								this[this.$keys[i]] = null;
							}
						}

						deferred.resolve({model: this, response: response.data});
						
						$rootScope.$broadcast('modelupdate', this);
					}
				} else
				{
					deferred.reject({model: this, response: response, modelData: data});
				}

			}.bind(this)).finally(function () {
				this.$busy = false;
			}.bind(this));


			return deferred.promise;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#undelete
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Undeletes the model on the server if it implements soft deletion
		 
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Model.prototype.unDelete = function () {
			this.reset();
			this.deleted = false;

			return this.save().then(function () {

			}.bind(this));
		};

		/**
		 
		 * When posting dates to the server API it requires them in ISO8060 standard.
		 * eg. 2014-07-28T13:00+2000. The problem with dates with times is that javascript converts them to UTC when converting to JSON.
		 * This will change the date and the server doesn't know which timezone it's in. We just want to post 2014-07-28 when it's about a date.
		 * This function will check for dates without time and changes it into a string.
		 *
		 * @returns {string}
		 */
		Model.prototype._convertDateToString = function (attributes) {
			return attributes;

//			var attr = {};
//			var l;
//
//			for (var attrName in attributes) {
//				if (attributes[attrName] instanceof Date) {
//
//					attr[attrName] = attributes[attrName].toIntermeshApiFormat();
//				} else if (angular.isObject(attributes[attrName])) {// && attributes[attrName].className){ //All models return className from API
//
//					var subAttr = attributes[attrName].getAttributes ? attributes[attrName].getAttributes() : attributes[attrName];
//
//					attr[attrName] = this._convertDateToString(subAttr);
//				} else if (angular.isArray(attributes[attrName]) && (l = attributes[attrName].length)) {// && attributes[attrName][0].className){
//					attr[attrName] = [];
//					for (var i = 0, l; i < l; i++) {
////									var fixed = this.convertDateToString(attributes[attrName][i]);
//						var subAttr = attributes[attrName][i].getAttributes ? attributes[attrName][i].getAttributes() : attributes[attrName][i];
//						attr[attrName].push(this._convertDateToString(subAttr));
//					}
//				} else
//				{
//					attr[attrName] = attributes[attrName];
//				}
//			}
//
//			return attr;
		};



		Model.prototype._convertDateStringsToDates = function (input) {

			return input;

//			for (var key in input) {
////						if (!input.hasOwnProperty(key))
////							continue;
//
//				// Check for string properties which look like dates.
//				if (typeof input[key] === "string") {
//
//					var value = Date.fromIntermeshApiFormat(input[key]);
//					if (value !== false) {
//						input[key] = value;
//					}
//
//				} else if (typeof input[key] === "object") {
//					// Recurse into object
//					this._convertDateStringsToDates(input[key]);
//				} else if (angular.isArray(input[key])) {
//					angular.forEach(input[key], function (item, index) {
//						input[key][index] = this._convertDateStringsToDates(item);
//					});
//				}
//			}
//
//			return input;
		};



		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#isModified
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Check if the model has modified attributes
		 *
		 * @returns {boolean} Returns true if the model was modified
		 */
		Model.prototype.isModified = function () {

			return Object.keys(this.getModifiedAttributes()).length > 0;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#isNew
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Check if the model is not saved on the server
		 *
		 * @returns {boolean} Returns true if the model is new
		 */
		Model.prototype.isNew = function () {
			
			if(this.$keys.length===0) {
				return false;
			}
			var isNew = false;
			for (var i in this.$keys) {
				if (GO.isEmpty(this[this.$keys[i]])) {
					isNew = true; //all keys must be set to be not new
				}
			}
			return isNew;
		};

		Model.prototype._isAttribute = function (name) {
			
			if (typeof (this[name]) === 'function') {
				return false;
			}

			var firstChar = name.substring(0, 1);

			return firstChar !== '$' && firstChar !== '_';
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getAttributes
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Get all model attributes
		 *
		 * @returns {Object} Key value pair of attributes
		 */
		Model.prototype.getAttributes = function () {

			return this._filterAttributes(this);
		};
		
		
		Model.prototype._filterAttributes = function(obj) {
			var attr = {};

			for (var attName in obj) {
				
				if (this._isAttribute(attName)) {
					//Added copy for permissions that included a "delete" property that interferred with the delete function.
					attr[attName] = angular.copy(obj[attName]);
					
					if(angular.isArray(attr[attName])) {
						for(var i=0,l=attr[attName].length;i<l;i++) {
							attr[attName][i] = this._filterAttributes(attr[attName][i]);
						}
					}else if(this._isModel(attr[attName])){
						attr[attName] = this._filterAttributes(attr[attName]);
					}
				}
			}

			return attr;
		};


		/**
		 * Mark an attribute modified
		 * 
		 * In some rare cases this is nessecary when you need to send an unmodified attribute to the server.
		 * 
		 * @param {sting} attrName				 
		 */
		Model.prototype.touchAttribute = function (attrName) {
			this.$oldAttributes[attrName] = null;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getModifiedAttributes
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Get all modified model attributes that have been changed after load
		 *
		 * @returns {Object} Key value pair of attributes
		 */
		Model.prototype.getModifiedAttributes = function () {
			var modified = this._getModifiedAttributesRecursive(this.getAttributes(), this.$oldAttributes, this.$keys);

			return modified;

		};
		
		Model.prototype._isModel = function(value) {
			return angular.isObject(value) && value.getModifiedAttributes;
		};

		Model.prototype._getModifiedAttributesRecursive = function (attributes, oldAttributes, keys) {

			var modified = {};

			for (var attributeName in attributes) {

				if (!this._isAttribute(attributeName)) {
					continue;
				}


				var value = attributes[attributeName];
				var oldValue = oldAttributes[attributeName];

				if (angular.isArray(value) && value.length) {
					var modifiedArray = this._getModifiedArray(value, oldValue);

					if (modifiedArray.length) {
						modified[attributeName] = modifiedArray;
					}
				} else if (!angular.equals(oldAttributes[attributeName], value)) {
					//value is an object without a type. (No Date for example). Or it's a model
					if(this._isModel(value)) {
						modified[attributeName] = this._filterAttributes(value);
					}else
					{
						modified[attributeName] = value;
					}					
				}
			}

			if (Object.keys(modified).length === 0) {
				return modified;
			}

			//add keys by default
			for (var keyIndex in keys) {
				modified[keys[keyIndex]] = attributes[keys[keyIndex]];
			}

			return modified;
		};


		Model.prototype._getModifiedArray = function (current, old) {

			var modified = [];
			var c = current.length;
			
			if(!old) {
				old = [];
			}
			
			if(current.length < old.length) {
				throw "You can't remove values from an array. Use markdeleted instead! Hint: use GO.markArrayDeleted();";
			}

			for (var i = 0; i < c; i++) {				
				if(!angular.equals(current[i],old[i])) {
					modified.push(this._filterAttributes(current[i]));
				}
			}

			return modified;
		};
		
		
		
	

//		Model.prototype.buildRoute = function () {
//			return this._appendKeys(this.$storeRoute);
//		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#save
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Save the model on the server
		 * 
		 * Save by defaults only sends modified attributes. If you need to send
		 * additional properties use touchAttribute(propName) before saving.
		 *
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#post}
		 */
		Model.prototype.save = function (getParams) {

			var params = this._getBaseParams();

			if (getParams) {
				angular.extend(params, getParams);
			}

			var method, url;
							
			if(this.isNew()){
				method = 'post';
				url = ServerAPI.url(this.getCreateRoute(), params);
			}else
			{
				method = 'put';
				url = ServerAPI.url(this.getUpdateRoute(), params);
			}

			var deferred = $q.defer();
			
//			Posting all props had the problem with relations posting both the object and the key. {language: null, languageId: 1}
//			var modifiedAttributes = this.isNew() ? this.getAttributes() : this.getModifiedAttributes();
			
			var modifiedAttributes = this.getModifiedAttributes();

			if (Object.keys(modifiedAttributes).length) {
				var saveParams = {};

				saveParams["data"] = this._convertDateToString(modifiedAttributes);

				this.$busy = true;

				$http[method](url, saveParams)
								.then(function (response) {
									var data = response.data.data;

									if (!response.data.success) {
										
										if (data) {
											//this.loadData(data, false);// do not load complete data because it may return partial data of has many relations. Only the submitted elements are returned.
											this._loadValidationErrors(data);										
										}
										deferred.reject({model: this, response: response, validationErrors: data ? data.validationErrors : null});
									} else {

										if (data) {
											this.loadData(data); 											
										}
										$rootScope.$broadcast('modelupdate', this);
										
										if(modifiedAttributes.tags) {
											$rootScope.$broadcast('tagschange', this);
										}

										deferred.resolve({model: this, response: response, modifiedAttributes: modifiedAttributes});
									}

								}.bind(this)).catch(function(response){
									deferred.reject({model: this, response: response, modifiedAttributes: modifiedAttributes});
								}.bind(this)).finally(function(){
									this.$busy = false;
								}.bind(this));
			} else
			{
				console.log("Not sending save request to server because model has not been modified");
				deferred.resolve({model: this, response: false, modifiedAttributes: modifiedAttributes});
			}

			return deferred.promise;
		};
		
		
		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#readIf
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Load the model data from the server but only if not already loaded
		 * with the same ID. Useful with detail and edit pages that share the same model.
		 *
		 * @param {object} params Key value pair of GET params for the request
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Model.prototype.readIf = function (keys, params) {

			keys = this._normalizeKeys(keys);
			
			var load = !angular.equals(keys, this.$lastKeys);
			
//			console.log(load);
				

//			var load = false;
//			for (var i in this.$keys) {
//				if (this[this.$keys[i]] != keys[this.$keys[i]]) {
//					load = true;
//				}
//			}

			if (!load) {

				if (!this.$lastReadPromise) {
					//model properties were probably set by store we don't have a 
					//read promise in this case so we'll create one.								
					var deferred = $q.defer();
					deferred.resolve({model: this});
					this.$lastReadPromise = deferred.promise;
				}

				return this.$lastReadPromise;
			} else
			{
				return this.read(keys, params);
			}
		};


		Model.prototype._normalizeKeys = function (keys) {
			
			if(typeof(keys) === "undefined") {
				return [];
			}
			
			if (!angular.isObject(keys)) {
				var firstKey = keys;
				keys = {};
				keys[this.$keys[0]] = firstKey;
			}

			return keys;
		};
		
		
		Model.prototype.pk = function () {
			var keys = {};
			
			for(var i = 0, l = this.$keys.length; i < l; i++) {
				keys[this.$keys[i]]= this[this.$keys[i]];
			}
			
			return keys;
		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#resetAttributes
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Reset the attributes to their original state.
		 *
		 * @param {string} attributeName if given, it will only reset that attribute
		 */
		Model.prototype.reset = function (attributeName) {
			

			if (attributeName) {
				this[attributeName] = angular.copy(this.$oldAttributes[attributeName]);
				return;
			}

			//keep reference 
			var attr = this.getAttributes();
			for (var i in attr) {
				delete this[i];
			}

			for (var i in this.$oldAttributes) {
				this[i] = angular.copy(this.$oldAttributes[i]);
			}			
		};


		/**
		 * 				 
		 * Adds validation errors to existing data without overwriting it.
		 */

		Model.prototype._loadValidationErrors = function (data, obj) {
			if (!obj) {
				obj = this;
			}

			if (data.validationErrors) {
				obj.validationErrors = data.validationErrors;
			}

			for (var attr in data) {

				if (angular.isArray(data[attr])) {
					for (var i = 0, l = data[attr].length; i < l; i++) {

						for (var n = 0, l2 = obj[attr].length; n < l2; n++) {

							if (data[attr][i].id === obj[attr][n].id ||
											!data[attr][i].id && !obj[attr][n].id) {
								this._loadValidationErrors(data[attr][i], obj[attr][n]);
								break;
							}
						}
					}
				} else if (angular.isObject(data[attr]) && angular.isObject(obj[attr])) {

					this._loadValidationErrors(data[attr], obj[attr]);
				}
			}


		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#loadData
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Load the initial model attributes from the server.
		 * Don't set attributes directly because this function makes a copy so the model can be reset to the old attributes.
		 *
		 * @param {object} data to load		 
		 */
		Model.prototype.loadData = function (data, clearModified) {			
			
			this._convertDateStringsToDates(data);
			
			this.setAttributes(data);			
			
			if(angular.isUndefined(clearModified) || clearModified) {
				this.clearModified();
			}
			

		};


		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#setAttributes
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Set attributes by object. All object members will be applied.
		 * 
		 * @param {object} attr the object to apply 
		 */
		Model.prototype.setAttributes = function (attr) {
//					this._convertDateStringsToDates(attr);

			for (var key in attr) {
				
				
				//if the relation is defined as function we call that with the data.
				if (angular.isObject(this[key])) {
					//loose reference
					this[key] = angular.copy(attr[key]);
				} else
				{
					this[key] = attr[key];
				}
			}
		};
		
		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#clearModified
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Clear modification flags on all attributes. In other words nothing changes
		 * in the model but isModified() will return false after calling this function.
		 */
		Model.prototype.clearModified = function() {
			this.$oldAttributes = angular.copy(this.getAttributes());
		};
		
		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#getStore
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Get a store for this model type, The store will also be added to this
		 * model in addStore().
		 * 
		 * @param {object} loadParams
		 */
		Model.prototype.getStore = function (loadParams) {
			var store = new Store(this.getStoreRoute(), loadParams);
			store.$modelProto = Object.getPrototypeOf(this);
			store.$modelConstructorArgs = this.$constructorArgs;

			return store;
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#reload
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Reload the model with the server data
		 * 
		 * @param {object} loadParams
		 */
		Model.prototype.reload = function () {

			var keys = {};
			for (var i in this.$keys) {
				keys[this.$keys[i]] = this[this.$keys[i]];
			}

			return this.read(keys, this.$lastReadParams);
		};

		/**
		 * @ngdoc method
		 * @name GO.Core.Factories.Data.Model#read
		 * @methodOf GO.Core.Factories.Data.Model
		 * @description
		 * Load the model data from the server
		 *
		 * @param {object} params Key value pair of GET params for the request
		 * @param {boolean} extendAttributes Keep current attributes and add the loaded attributes
		 * @returns {HttpPromise} Returns a HttpPromise. See: {@link https://docs.angularjs.org/api/ng/service/$http#get}
		 */
		Model.prototype.read = function (keys, params, extendAttributes) {
			
			

			keys = this.$lastKeys = this._normalizeKeys(keys);

			var p = this._getBaseParams();

			angular.extend(p, params);

			this.$lastReadParams = p;
			
			this.setAttributes(keys);

			var url = this.getReadRoute();

//			for (var i in this.$keys) {
//				if (keys[this.$keys[i]] + "" === "") {
//					break;
//				}
//				url += '/' + keys[this.$keys[i]];
//			}

			var url = ServerAPI.url(url, p);
			var deferred = $q.defer();

			this.$busy = true;

			$http.get(url).then(function (response) {


				if (response.data.data) {

					if (extendAttributes) {
						for (var key in response.data.data) {
							delete this[key];
						}
						angular.extend(response.data.data, this.getAttributes());
					}

					this.loadData(response.data.data);

					deferred.resolve({model: this, response: response});
				} else
				{
					deferred.reject({model: this, response: response});
				}
				
				
				
				

			}.bind(this)).catch(function (response) {

								deferred.reject({model: this, response: response});
							}.bind(this)).finally(function () {

								this.$busy = false;
							}.bind(this));


			this.$lastReadPromise = deferred.promise;

			return deferred.promise;

		};

		return Model;

	}]);
