//Override this function with one minor change to allow image pasting in firefox
//See: https://github.com/Voog/wysihtml/issues/163
wysihtml5.Editor.prototype._initParser = function() {
      var oldHtml,
          cleanHtml;

      if (wysihtml5.browser.supportsModernPaste()) {
        this.on("paste:composer", function(event) {
          
          oldHtml = wysihtml5.dom.getPastedHtml(event);
          if (oldHtml) {
						event.preventDefault();
            this._cleanAndPaste(oldHtml);
          }
        }.bind(this));

      } else {
        this.on("beforepaste:composer", function(event) {
          event.preventDefault();
          var scrollPos = this.composer.getScrollPos();

          wysihtml5.dom.getPastedHtmlWithDiv(this.composer, function(pastedHTML) {
            if (pastedHTML) {
              this._cleanAndPaste(pastedHTML);
            }
            this.composer.setScrollPos(scrollPos);
          }.bind(this));

        }.bind(this));
      }
    };