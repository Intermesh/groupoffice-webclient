'use strict';

angular.module('GO.Modules.GroupOffice.Files').factory('GO.Modules.GroupOffice.Files.Model.Browser', [
	
	'$state',
	function ($state) {
		function Browser(store) {
			this.store = store;
		}
		var t = {
			grid:1,
			list:2,
			images:3 // todo
		};
		var specialFolders = {
			home: 'Home',
			starred: 'Starred',
			recent: 'Recent',
			trash: 'Trash',
			shared: 'Shared',
			locations: 'Locations'
		};
		Browser.prototype.home = null;
		Browser.prototype.store = null;
		Browser.prototype.dirStack = [];
		Browser.prototype.display = t.list;
		Browser.prototype.currentDir = null;

		Browser.prototype.filter = function(name) {
			switch(name) {
				case 'starred':
				case 'recent':
				case 'trash':
					var filter = {};
					filter[name] = true;
					this.store.$loadParams.filter = filter;
					break;
				case 'home':
					delete this.store.$loadParams.filter;
			}
			if(this.home) {
				this.store.$loadParams.directory = this.home.rootId;
				this.store.load();
			}
			this.dirStack = [{id:1,name: specialFolders[name] || 'Home'}];
			return this;
		};

		Browser.prototype.goTo = function(model) {

			var self = this;
			if(angular.isNumber(model)) {
				model = {id:model, isDirectory: true};
			}
			var dir = (model.isDirectory || !model.parentId) ? model.id : model.parentId;

//			if(model.isDirectory) {
//				$state.go('files.list.node',{id: dir});
//				if(this.dirStack.length===0 || model.parentId === this.dirStack[this.dirStack.length-1].id) {
//					this.dirStack.push(model);
//				}
//			}
			this.store.$loadParams.directory = dir;
			this.store.load().then(function(xhr) {
				xhr.response.data.path.reverse();
				self.dirStack = xhr.response.data.path;
				self.currentDir = dir;
			});
			
			return this;
		};

		Browser.prototype.depth = function() {
			return this.dirStack.length-1;
		};

		Browser.prototype.isAt = function(place) {
			return this.at == place;
		};

		Browser.prototype.up = function() {
			if(this.dirStack.length > 1) {
				this.dirStack.pop();
			}
			this.currentDir = this.dirStack[this.dirStack.length-1];
			$state.go('files.list.node',{id:this.currentDir.id});
		};

		Browser.prototype.isGrid = function() {
			return (this.display === 1);
		};

		Browser.prototype.isList = function() {
			return (this.display === 2);
		};

		Browser.prototype.setDisplay = function(type) {
			this.display = t[type];
		};

		return Browser;
}]);