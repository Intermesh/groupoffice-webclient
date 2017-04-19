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
		Browser.prototype.at = 'home';
		Browser.prototype.store = null;
		Browser.prototype.dirStack = [{name:'Home', id:'home', at:'home'}];
		Browser.prototype.display = t.list;

		Browser.prototype.goTo = function(model) {


			if(!angular.isString(model)) { // mine, recent, etc
				$state.go("files.storage", {drive:model.path});
				if(angular.isNumber(model)) {
					this.at = 'd'+model; //prefix for drives
					this.store.load({directory:model});
				}
				return this;
			}
			
			switch(model) {
				case 'starred':
				case 'recent':
				case 'trash':
				case 'shared':
				case 'locations':
					var filter = {};
					filter[model] = true;
					this.store.$loadParams.filter = filter;
					break;
				case 'home':
					delete this.store.$loadParams.filter;
			}
			this.at = model;
			this.dirStack = [{name:specialFolders[model], id:null, at:model}];

			var self = this;
			this.store.load().then(function(xhr){
				var dir;
				self.dirStack = [self.dirStack[0]];
				if(xhr.response.data.path && xhr.response.data.path.length) {
					if(self.at === 'home') {
						self.dirStack = [];
					}
					while(dir = xhr.response.data.path.pop()) {
						self.dirStack.push(dir);
					}
				}
			});
			$state.go("files.storage");
			
			return this;
		};
		Browser.prototype.open = function(model) {
			
			$state.go("files.storage.node");
			if(model.isDirectory) {
				this.goTo(model);
			} else {
				console.log('cant open a file');
			}
		};
		Browser.prototype.depth = function() {
			return this.dirStack.length-1;
		};

		Browser.prototype.isAt = function(place) {
			return this.at == place;
		};

		Browser.prototype.up = function() {
			console.log('dir up');
			var dir = (this.dirStack.length > 1) ? this.dirStack.pop() : this.dirStack[0];
			var params = dir.parentId ? {directory:dir.parentId} : {};
			this.store.load(params);
		};

		Browser.prototype.currentDir = function() {
			return this.dirStack[this.depth()];
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