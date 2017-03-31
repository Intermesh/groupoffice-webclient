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
			if(angular.isString(model)) { // mine, recent, etc
				this.store.load();
				this.dirStack = [{name:specialFolders[model], id:null, at:model}];
			}
			$state.go("files.drive", {id:model.id});
			return this;
		};
		Browser.prototype.open = function(model) {
			var self = this;
			$state.go("files.drive");
			if(model.isDirectory) {
				console.log(model);
				this.store.load({directory: model.id}).then(function(xhr){
					var dir;
					self.dirStack = [self.dirStack[0]];
					if(self.at === 'home') {
						self.dirStack = [];
					}
					while(dir = xhr.response.data.path.pop()) {
						self.dirStack.push(dir);
					}
					console.log(self.dirStack);
					//self.dirStack.push(model);
				});
			} else {
				console.log('cant open file');
			}
		};
		Browser.prototype.depth = function() {
			return this.dirStack.length-1;
		};

		Browser.prototype.isAt = function(place) {
			return this.currentDir().at == place;
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