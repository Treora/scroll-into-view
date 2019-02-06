// Polyfill to improve Element.scrollIntoView()

var scrollIntoView = (function () {

// Original implementation is used for backwards compatibility
var scrollIntoView_original = Element.prototype.scrollIntoView;

function scrollIntoView(options) {

  // Use traditional scrollIntoView when traditional argument is given.
  if (options === undefined || options === true || options === false) {
    scrollIntoView_original.apply(this, arguments);
    return;
  }

  var window = this.ownerDocument.defaultView;

  // Read options.
  if (options === undefined)  options = {};
  if (options.center === true) {
    options.vertical = 0.5;
    options.horizontal = 0.5;
  }
  else {
    if (options.block === "start")  options.vertical = 0.0;
    else if (options.block === "end")  options.vertical = 0.0;
    else if (options.vertical === undefined)  options.vertical = 0.0;

    if (options.horizontal === undefined)  options.horizontal = 0.0;
  }

  // Fetch positional information.
  var rect = this.getBoundingClientRect();

  // Read the viewport height&width, excluding scrollbars. Browser behaviour appears inconsistent
  // when rendering in quirks mode, but hopefully this formula covers every scenario.
  var viewPortHeight = document.documentElement.clientHeight || document.body.clientHeight;
  var viewPortWidth = document.documentElement.clientWidth || document.body.clientWidth;

  // Determine location to scroll to.
  var targetY = window.scrollY + rect.top - (viewPortHeight - this.offsetHeight) * options.vertical;
  var targetX = window.scrollX + rect.left - (viewPortWidth - this.offsetWidth) * options.horizontal;

  // Scroll.
  window.scroll(targetX, targetY);

  // If window is inside a frame, center that frame in the parent window. Recursively.
  if (window.parent !== window) {
    // We are inside a scrollable element.
    var frame = window.frameElement;
    scrollIntoView.call(frame, options);
  }
}

// Add a method that replaces the browser's implementation.
function installPolyfill() {
  Element.prototype.scrollIntoView = scrollIntoView;
}
scrollIntoView.installPolyfill = installPolyfill;

return scrollIntoView;

})();


// CommonJS/Node support.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = scrollIntoView;
}
