angular.module('GO.Modules.GroupOffice.Files').factory('GO.Modules.GroupOffice.Files.Model.Clipboard', [
	'$http',
	'GO.Core.Services.ServerAPI',
	function ($http, ServerAPI) {
		function Clipboard(store) {
			this.store = store;
		}

		Clipboard.prototype.store = null;

		Clipboard.prototype.itemIds = [];
		Clipboard.prototype.isMoving = null; // copy is false

		Clipboard.prototype.clear = function() {
			this.itemIds = [];
		};

		Clipboard.prototype.isEmpty = function() {
			return (this.itemIds.length === 0);
		};

		Clipboard.prototype.cut = function(item) {
			this.isMoving = true;
			this.itemIds.push(item.id);
		};

		Clipboard.prototype.copy = function(item) {
			this.isMoving = false;
			this.itemIds.push(item.id);
		};

		Clipboard.prototype.paste = function(to) {
			var self = this;
			console.log(this.itemIds);
			var url = ServerAPI.url('files/'+to.id, {copy:!this.isMoving});
			$http.post(url, {ids:this.itemIds}).then(function(resp) {
				if(resp.data.success) {
					self.clear();
					self.store.reload();
				}
			});

		};

		return Clipboard;
}]);