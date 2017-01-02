angular.module('GO.Core').service('GO.Core.Form.Wysiwyg.ImagePaster', ['$timeout', function ($timeout) {
		function ImagePaster(editor, callbackFunction) {

			this.callbackFunction = callbackFunction;
			this.editor = editor;

			editor.on('paste:composer', this.handlePaste.bind(this));
//			editor.editableElement.addEventListener('paste', this.handlePaste.bind(this));
		}

		ImagePaster.prototype.handlePaste = function (clipboardEvent) {
			
			var clipboardData = clipboardEvent.clipboardData;
			if (clipboardData.items) {
				//Chrome has clibBoardData.items
				for (var i = 0, l = clipboardData.items.length; i < l; i++) {
					var item = clipboardData.items[i];
					if (item.type.match(/^image\//)) {
						var reader = new FileReader();
						reader.onload = function(event) {
							return this._handleImage(event.target.result);
						}.bind(this);
						reader.readAsDataURL(item.getAsFile());
					}
				}
			} else {

				//Firefox
				if (-1 === Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {					
					this.findImageInEditor();
				}

				//IE has a global cliboardData object
//				if (window.clipboardData) {			
//					
//					console.log(window.clipboardData.files);
//					var results = [];
//					for (var j = 0, l = window.clipboardData.files.length; j < l; j++) {
//						var file = window.clipboardData.files[j];
//						console.log(file);
//						this._handleImage(URL.createObjectURL(file));
//						//results.push(this._checkImagesInContainer(function () {
////						}));
//					}
//					return results;					
//				}
			}

		};

		/**
		 * Firefox handles image pasting differntly. It pastes an <img /> tag with a
		 * base64 URL in the content editable div. 
		 * the findImageInEditor function finds this image element and converts it 
		 * into a Blob.
		 * 
		 * @returns {undefined}
		 */
		ImagePaster.prototype.findImageInEditor = function () {
			var el = angular.element(this.editor.editableElement);

			var images = el.find('img');
			var timespan = Math.floor(1000 * Math.random());
			for (var i = 0, len = images.length; i < len; i++) {
				images[i]["_paste_marked_" + timespan] = true;
			}
			$timeout(function () {

				var newImages = el.find('img');
				for (var i = 0, len = newImages.length; i < len; i++) {
					if (!newImages[i]["_paste_marked_" + timespan]) {
						this._handleImage(newImages[i].src);
						newImages[i].remove();
					}
				}

			}.bind(this), 1);
		};

		ImagePaster.prototype._handleImage = function (src) {

			var dataURLtoBlob = function (dataURL, sliceSize) {
				var b64Data, byteArray, byteArrays, byteCharacters, byteNumbers, contentType, i, m, offset, slice, _ref;
				if (sliceSize == null) {
					sliceSize = 512;
				}
				if (!(m = dataURL.match(/^data\:([^\;]+)\;base64\,(.+)$/))) {
					return null;
				}
				_ref = m, m = _ref[0], contentType = _ref[1], b64Data = _ref[2];
				byteCharacters = atob(b64Data);
				byteArrays = [];
				offset = 0;
				while (offset < byteCharacters.length) {
					slice = byteCharacters.slice(offset, offset + sliceSize);
					byteNumbers = new Array(slice.length);
					i = 0;
					while (i < slice.length) {
						byteNumbers[i] = slice.charCodeAt(i);
						i++;
					}
					byteArray = new Uint8Array(byteNumbers);
					byteArrays.push(byteArray);
					offset += sliceSize;
				}
				return new Blob(byteArrays, {
					type: contentType
				});
			};

			var loader;
			loader = new Image();
			loader.onload = function () {
				var blob, canvas, ctx, dataURL;
				canvas = document.createElement('canvas');
				canvas.width = loader.width;
				canvas.height = loader.height;
				ctx = canvas.getContext('2d');
				ctx.drawImage(loader, 0, 0, canvas.width, canvas.height);
				dataURL = null;
				try {
					dataURL = canvas.toDataURL('image/png');
					blob = dataURLtoBlob(dataURL);
				} catch (_error) {
				}
				if (dataURL) {
					this.callbackFunction({
						editor: this.editor,
						blob: blob,
						dataURL: dataURL,
						width: loader.width,
						height: loader.height
					});
				}
			}.bind(this);

			return loader.src = src;
		};

		return ImagePaster;

	}]);