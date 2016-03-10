# scroll-into-view

This script provides a polyfill to support unstandardised options to the standard [`Element.scrollIntoView`][1]. The functionality has been [suggested before][2], which this code is (loosely) based on.
The main added feature is that it can scroll to put the element into the center or any other place of the view, rather than just at the top or bottom.

## Usage

The script defines the method `scrollIntoView`, which can be used either directly or can be installed to replace the browser's implementation:

```js
// If using CommonJS/Node, require the module.
var scrollIntoView = require('scroll-into-view');

// (pick an element to scroll to)
var someElement = document.getElementById('mypicture');

// Choose where and how to scroll.
var options = {center: true};

// Approach 1: Use it without installing, using 'call'.
scrollIntoView.call(someElement, options);

// Approach 2: Install in the browser.
scrollIntoView.installPolyfill();
someElement.scrollIntoView(options);
```

Currently supported options:
- vertical: scalar between 0 and 1. Default = 0. The value 0 aligns the
    top of the element with the top of the view, 1 aligns the bottom with the
    bottom, and 0.5 (default) puts the center in the center.
- horizontal: scalar between 0 and 1. Default = 0. Functions like vertical.
- center: boolean. Default = false. Forces vertical = horizontal = 0.5.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
[2]: https://www.w3.org/Bugs/Public/show_bug.cgi?id=17152
