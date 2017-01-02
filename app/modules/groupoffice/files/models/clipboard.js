angular.module('GO.Modules.GroupOffice.Files').factory('GO.Modules.GroupOffice.Files.Model.Clipboard', [
	function () {
		function Clipboard() {
		}

		Clipboard.prototype.items = [];
		Clipboard.prototype.isMoving = null; // copy is false

		Clipboard.prototype.clear = function() {
			this.items = [];
		};

		Clipboard.prototype.isEmpty = function() {
			return (this.items.length === 0);
		};

		Clipboard.prototype.cut = function(items) {
			this.isMoving = true;
			this.items.push(items);
		};

		Clipboard.prototype.copy = function(items) {
			this.isMoving = false;
			this.items.push(items);
			console.log(this.items);
		};

		Clipboard.prototype.paste = function(to) {
			for(var i = 0; i < this.items.length; i++) {
				var item;
				if(!this.isMoving) {
					item = angular.copy(this.items[i]);
					delete item.id;
					item.parentId = to.id;
				} else {
					item = this.items[i];
					item.parentId = to.id;
				}
				item.save(); // Todo save all in 1 request
			}
		};

		return Clipboard;
}]);