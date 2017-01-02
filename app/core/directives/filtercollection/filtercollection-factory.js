'use strict';

/**
 * @ngdoc service
 * @name GO.Core.Directives.FilterCollection
 *
 * @description
 * This service is used in the filtercollection directive. It is also passed as 
 * a load callback.
 * 
 * @example View directive
 * 
 * <div go-on-load="onFilterLoad(filterCollection)" go-filter-collection="messages/filters" go-store="store" flex></div>
 * 
 * @example Controller
 * 
 * $scope.onFilterLoad = function (filterCollection) {
 *   console.log(filterCollection);
 *   console.log(filterCollection.getFilterParams());
 * }
 *
 */
angular.module('GO.Core').factory('GO.Core.Directives.FilterCollection', [
	'$http',
	'GO.Core.Services.ServerAPI',
	'$location',
	function ($http, ServerAPI, $location) {

		function FilterCollection(filtersRoute, store, onLoadCallback) {

			this.store = store;

			this.onLoadCallback = onLoadCallback;


			//this will make the store reload this collection when a model is updated
			this.store.$filterCollection = this;

			this.filtersRoute = filtersRoute; //eg. 'contacts/filters'
			this.filters = {};
			this.loadParams = {};

//			this.sessionStorageKey = 'filter_' + this.filtersRoute.replace('/', '_');

			//load from session or server
//							if(sessionStorage[this.sessionStorageKey]) {
//								this.data = angular.fromJson(sessionStorage[this.sessionStorageKey]);
//								//autoload store
//								angular.extend(this.store.$loadParams, this.getFilterParams());
//								this.store.load();
//								
//								if(this.onLoadCallback) {
//									this.onLoadCallback({"filterCollection": this});
//								}
//							}else
//							{
			this.load().then(function () {
				var filterParams = this.getFilterParams(true);
				angular.extend(this.store.$loadParams, filterParams);
				this.store.load();
				
				//update URL query params
				$location.search(filterParams);

				if (this.onLoadCallback) {
					this.onLoadCallback({"filterCollection": this});
				}
			}.bind(this));
//							}
		}
		
		FilterCollection.prototype.findFilter = function(name) {
			for(var i=0, l= this.filters.length;i<l;i++) {
				if(this.filters[i].name == name) {
					return this.filters[i];
				}
			}
			return false;
		};


		FilterCollection.prototype.load = function () {
			return $http.get(ServerAPI.url(this.filtersRoute, this.loadParams)).then(function (result) {
				this.filters = result.data.filters;
			}.bind(this));
		};

		FilterCollection.prototype.clearSelection = function (filter) {
			angular.forEach(filter.options, function (option) {
				option.selected = false;
			});
		};

		FilterCollection.prototype.toggleOption = function ($event, filter, option) {

			if (filter.type == 'singleselect') {
				this.clearSelection(filter);
			}

			//clear filters that should not be used in conjunction with this one.
			if (filter.clearFilters.length) {
				angular.forEach(this.filters, function (f) {
					if (filter.clearFilters.indexOf(f.className) > -1) {
						this.clearSelection(f);
					}
				}.bind(this));
			}

			option.selected = !option.selected;

//							console.log(option);

			this._applyFilters();
//							.then(function () {
//				$timeout(function () {
//									document.getElementById($event.target.id).focus();
//				});

//			});
		};

		FilterCollection.prototype._applyFilters = function () {

			var searchParams = $location.search();

			var filterParams = this.getFilterParams();

			searchParams = angular.extend(searchParams, filterParams);

//							console.log(searchParams);
			//update URL query params
			$location.search(searchParams);

			angular.extend(this.store.$loadParams, filterParams);
			angular.extend(this.loadParams, filterParams);

			return this.store.load();
//							return this.load();
		};

		FilterCollection.prototype.promptOption = function (option, optionName) {
			this.setOption(option, optionName, prompt("Enter number"));
		};

		FilterCollection.prototype.setOption = function (option, optionName, value) {
			option[optionName] = value;
			this._applyFilters();
		};

		FilterCollection.prototype.getFilterParams = function (fromLocation) {
			var params = {useFilters: 1};

			angular.forEach(this.filters, function (filter) {
				params[filter.name] = "";

				var search = $location.search()[filter.name];
				
//				console.log(search);

			

				switch (filter.type) {

					case 'singleselect':
						angular.forEach(filter.options, function (option) {

							if (fromLocation && angular.isDefined(search)) {
								option.selected = search == option.value;
							}

							if (option.selected) {
								params[filter.name] = option.value;
							}
						});
						break;

					case 'multiselect':


						angular.forEach(filter.options, function (option) {

							if (fromLocation && angular.isDefined(search)) {
								option.selected = search.split(',').indexOf(option.value) !== -1;
							}

							if (option.selected) {
								if (params[filter.name] !== "") {
									params[filter.name] += ",";
								}
								params[filter.name] += option.value;
							}
						});
						break;

					case 'numberrange':

						if (fromLocation && angular.isDefined(search)) {
							var v = search.split(',');

							if (v[0] > 0)
								filter.min = v[0];

							if (v[1] > 0)
								filter.max = v[1];
						}

						params[filter.name] = filter.min + "," + filter.max;
						break;
				}

			});

			
			return params;
		};

		return FilterCollection;
	}]);
			