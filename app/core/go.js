/**
 * 
 * @ngdoc service
 * @name GO
 * @description
 * Global singleton object with some common used funcions
 * 
 * This singleton is also added to the $rootScope. So $rootScope.GO.isEmpty will work.
 */



GOUtils = function () {
	
	
	this.hooks = new GOHooks();
	
	this.appModules = [
		
		
		'GO.Core',
		'GO.Controllers'
		
		
	];
};

/**
 * @ngdoc method
 * @methodOf GO
 * @name GO.isEmpty
 * @description
 * Check if a variable is false, null, undefined, 0, empty string or empty array
 * 
 * @param {mixed} v
 * @returns {Boolean}
 */

GOUtils.prototype.isEmpty = function (v) {
	return v === "" ||
			v === 0 ||
			v === null ||
			angular.isUndefined(v) ||
			angular.isArray(v) && v.length === 0;
};

/**
 * @ngdoc method
 * @methodOf GO
 * @name GO.module
 * @description
 * Register a new angular module. See angular.module and also put it into the 
 * main app dependencies.
 * 
 * @param {!string} name The name of the module to create or retrieve.
 * @param {!Array=} requires If specified then new module is being created. If
 * unspecified then the module is being retrieved for further configuration.
 * @param {Function=} configFn Optional configuration function for the module. Same as
 * {@link angular.Module#config Module#config()}.
 * @returns {module} new module with the {@link angular.Module} api.
 */
GOUtils.prototype.module = function (name, moduleDependencies, configFn) {

	if (typeof (moduleDependencies) !== 'undefined') {
		this.appModules.push(name);
	}
	return angular.module(name, moduleDependencies, configFn);

};

/**
 * Extend a class
 * 
 * @example
 * <code>
 * 
 * var Account = GO.extend(Model, function(){
 *	this.$parent.constructor.call(this, arguments);
 * });
 *
 * Account.prototype.newFunction = function() {
 *
 * };
 * </code>
 * 
 * @param {function} BaseCls
 * @param {function} constructorFn
 * @returns {function}
 */
GOUtils.prototype.extend = function(BaseCls, constructorFn) {
	
	var hasConst = typeof(constructorFn) != 'undefined';
	
	if(!constructorFn) {
		constructorFn = function(){};
	}
	
	constructorFn.prototype = Object.create(BaseCls.prototype);
	if(hasConst) {
		constructorFn.prototype.constructor = constructorFn;	
	}
	constructorFn.prototype.$parent = BaseCls.prototype;
	return constructorFn;
};




/**
 * 
 * @ngdoc service
 * @name GO.hooks
 * @description
 * 
 * Used for customizations
 * 
 */


function GOHooks() {
	this.hooks = {};
	this.controllerOverrides = {};
}

/**
 * @ngdoc method
 * @methodOf GO.hooks
 * @name GO.hooks.register
 * @description
 * Register a template hook
 * 
 * @param {string} name The name of the hook
 * @param {function} fn The injectable function
 * 
 * @example
 * 
 * GO.hooks.register('contact' , ['element', function(element) {
 *	var contents = element.find('md-content');
 *	contents.prepend('<md-card id="info2"><md-card-content ng-include="\'customizations/intermesh/modules/groupoffice/contacts/contact.html\'"></md-card-content></md-card>');
 * }]);
 * 
 * @returns {void}
 */
GOHooks.prototype.register = function(name, fn) {
	this.hooks[name] = this.hooks[name] || [];	
	this.hooks[name].push(fn);
};

/**
 * Apply all template hooks.
 * 
 * Don't use this function directly. Use the direcive "go-hook". This directive
 * calls this function.
 * 
 * @param {type} name
 * @param {type} element
 * @param {type} $injector
 * @returns {unresolved}
 */
GOHooks.prototype.apply = function(name, element, $injector) {
	
	if(this.hooks[name]) {
		for(var i = 0, l = this.hooks[name].length;i < l; i++) {
			$injector.invoke(this.hooks[name][i], this, {element: element});
		}
	}
	
	return element;
};

/**
 * @ngdoc method
 * @methodOf GO.hooks
 * @name GO.hooks.overrideController
 * @description
 * Override a controller scope
 * 
 * @example
 * 
 * 
 * GO.hooks.overrideController("GO.Modules.GroupOffice.Contacts.ContactController", ["ctrlLocals", "$mdDialog", "GO.Core.Providers.Translate", function(ctrlLocals, $mdDialog, Translate){
 *		
 *	//example hook to put a confirm dialog before the original edit function of a contact
 *		
 *	//copy the original edit function so we can use it later after the confirmation
 *	var origEdit = ctrlLocals.$scope.edit;
 *
 *	//overwrite the edit function
 *	ctrlLocals.$scope.edit = function() {
 *		
 *		//copy function arguments to apply later
 *		var args = arguments;
 *		
 *		//create confirm dialog
 *		var confirm = $mdDialog.confirm()
 *												.title(Translate.t('A stupid question'))
 *												.textContent(Translate.t('Do you really want to edit this contact?'))
 *												.ariaLabel('Confirm')
 *												.ok(Translate.t("Yes"))
 *												.cancel(Translate.t("No, take me away!"));
 *								
 *								$mdDialog.show(confirm).then(function () {
 *
 *									//call orignal edit function
 *									return origEdit.apply(null, args);
 *								}, function () {									
 *									close();
 *								});								
 *	};
 * }]);
 * 
 * 
 * 
 * @param {string} controllerName
 * @param {function} fn
 * @returns {void}
 */
GOHooks.prototype.overrideController = function(controllerName, fn) {
	this.controllerOverrides[controllerName] = this.controllerOverrides[controllerName] || [];	
	this.controllerOverrides[controllerName].push(fn);
};

/**
 * Method used by a decorator that's defined in app.js
 * 
 * When a controller is instantiated it checks if there are overrides to apply.
 * 
 * @param {type} controllerName
 * @param {type} ctrlLocals
 * @param {type} $injector
 * @returns {undefined}
 */
GOHooks.prototype.applyControllerOverrides = function(controllerName, ctrlLocals, $injector) {
	
	
	if(!angular.isString(controllerName)) {
		
		//Direct function given as controller. Can't override that.
		return;
	}
	
	//remove controller as syntax, eg. "ControllerName as ctrl"	
	var parts = controllerName.replace(' AS ', ' as ').split('as');	
	var controllerName = parts[0].trim();	
	
	
	if(this.controllerOverrides[controllerName]) {
		for(var i = 0, l = this.controllerOverrides[controllerName].length;i < l; i++) {
			$injector.invoke(this.controllerOverrides[controllerName][i], this, {ctrlLocals: ctrlLocals});
		}
	}
};




/**
 * Compare an old and new array of models and put the removed models with a 
 * property markDeleted: true back into the new array.
 * 
 * Useful for the API where you can send [{id: 1, markDeleted: true}] to remove 
 * hasMany records.
 * 
 * The standard md-chips directive for example does not support our markDeleted 
 * property.
 * 
 * @example
 * 
 * GO.markArrayDeleted(['id'], $scope.model._oldAttributes.tags, $scope.model.tags);
 * 
 * @example
 * 
 *	var origSave = $scope.save;
						
		$scope.save = function() {							
			GO.markArrayDeleted(['id'], $scope.model._oldAttributes.tags, $scope.model.tags);							
			return origSave.call(this);
		};
 * 
 * @param {Array} keys
 * @param {Array} oldArray
 * @param {Array} newArray
 */
GOUtils.prototype.markArrayDeleted = function (keys, oldArray, newArray) {

	if(!oldArray) {
		return;
	}
	
	for (var i = 0, c = oldArray.length; i < c; i++) {
		if (this._arrayHasModel(newArray, oldArray[i], keys) === -1) {

			var model = {markDeleted: true};
			for (var keyIndex in keys) {
				model[keys[keyIndex]] = oldArray[i][keys[keyIndex]];
			}

			newArray.push(model);
		}
	}
};

GOUtils.prototype._arrayHasModel = function (newArray, model, keys) {
	for (var i = 0, c = newArray.length; i < c; i++) {

		var found = true;
		for (var keyIndex in keys) {
			if (model[keys[keyIndex]] !== newArray[i][keys[keyIndex]]) {
				found = false;
				break;
			}
		}
		if (found) {
			return i;
		}
	}

	return -1;
};


var GO = new GOUtils();


	