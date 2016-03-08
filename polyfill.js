(function () {

function scrollIntoView (options) {
  var window = this.ownerDocument.defaultView;

  // Traditional scrollIntoView.
  if (options === undefined || options === true
                            || options === false) {
    this.scrollIntoView(options);
    return;
  }

  // Fetch positional information.
  //
  // The following are always from the {top, bottom, left, right}
  // of the viewport, to the {top, …} of the box.
  // Think of them as geometrical vectors, it helps.
  // The axes are directed downwards and towards the right.

  var rect = this.getBoundingClientRect(),
      topToBottom = rect.bottom,
      bottomToTop = rect.top - window.innerHeight,
      leftToRight = rect.right,
      rightToLeft = rect.left - window.innerWidth,
      xAllowed = true,  // We allow one translation on the x axis,
      yAllowed = true;  // and one on the y axis.

  // Read options.
  //
  // We have the following options:
  // - float vertical = 0.5        (from 0 to 1).
  // - float horizontal = 0.0      (from 0 to 1).
  // - boolean notIfViewed = true

  if (options.vertical === undefined)  options.vertical = 0.5;
  if (options.horizontal === undefined)  options.horizontal = 0.5;
  if (options.evenIfViewed === undefined)  options.evenIfViewed = false;

  // Whatever `horizontal` and `vertical` are,
  // the behavior is the same if the box is (even partially) visible.

  if (topToBottom > 0 && topToBottom <= this.offsetHeight) {
    if (yAllowed) {
      window.scrollBy(0, topToBottom - this.offsetHeight);
      yAllowed = false;
    }
  } else
  if (bottomToTop < 0 && bottomToTop >= -this.offsetHeight) {
    if (yAllowed) {
      window.scrollBy(0, bottomToTop + this.offsetHeight);
      yAllowed = false;
    }
  }

  if (leftToRight > 0 && leftToRight <= this.offsetWidth) {
    if (xAllowed) {
      window.scrollBy(leftToRight - this.offsetWidth, 0);
      xAllowed = false;
    }
  } else
  if (rightToLeft < 0 && rightToLeft >= -this.offsetWidth) {
    if (xAllowed) {
      window.scrollBy(rightToLeft + this.offsetWidth, 0);
      xAllowed = false;
    }
  }

  // If we want it positioned in the viewport,
  // and the box is completely hidden,
  // then we position it explicitly.

  if (yAllowed && (options.evenIfViewed? true:
      (topToBottom <= 0 || bottomToTop >= 0))) {
    window.scroll(window.scrollX,
           window.scrollY + rect.top
           - (window.innerHeight - this.offsetHeight) * options.vertical);
  }

  if (xAllowed && (options.evenIfViewed? true:
      (leftToRight <= 0 || rightToLeft <= 0))) {
    window.scroll(window.scrollX + rect.left
           - (window.innerWidth - this.offsetWidth) * options.horizontal,
           window.scrollY);
  }

  if (window.parent !== window) {
    // We are inside a scrollable element.

    var frame = window.frameElement;
    scrollIntoView.call(frame, options);
  }
}

// Hook the polyfill.
Element.prototype._scrollIntoView = scrollIntoView;

})();
