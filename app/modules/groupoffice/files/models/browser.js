'use strict';

angular.module('GO.Modules.GroupOffice.Files').factory('GO.Modules.GroupOffice.Files.Model.Browser', [
	'GO.Modules.GroupOffice.Notifications.Services.Notifications',
	'$state',
	function (Notifications, $state) {
		function Browser(store) {
			this.store = store;
		}
		var t = {
			grid:1,
			list:2,
			images:3 // todo
		};
		var specialFolders = {
			mine: 'My Files',
			starred: 'Starred',
			recent: 'Recent',
			trash: 'Trash',
			shared: 'Shared'
		};
		Browser.prototype.at = 'mine';
		Browser.prototype.store = null;
		Browser.prototype.dirStack = [{name:'My Files', id:null, at:'mine'}];
		Browser.prototype.display = t.list;

		Browser.prototype.goTo = function(model) {
			switch(model) {
				case 'starred':
				case 'recent':
				case 'trash':
				case 'shared':
					var filter = {};
					filter[model] = true;
					this.store.$loadParams.filter = filter;
					this.store.load();
					break;
				case 'mine':
					delete this.store.$loadParams.filter;
			}
			if(angular.isString(model)) { // mine, recent, etc
				this.store.load();
				this.dirStack = [{name:specialFolders[model], id:null, at:model}];
			}
			$state.go("files.file", {id:model.id});
			return this;
		};
		Browser.prototype.open = function(model) {
			var self = this;
			if(model.isDirectory) {


				

				this.store.load({directory:model.id}).then(function(xhr){
					var dir;
					self.dirStack = [self.dirStack[0]];
					while(dir = xhr.response.data.path.pop()) {
						self.dirStack.push(dir);
					}
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
			return this.dirStack[this.dirStack.length-1];
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