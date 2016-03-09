# scroll-into-view

This script provides a polyfill to support unstandardised options to the standard [`Element.scrollIntoView`][1]. The functionality has been [suggested before][2], which this code is based on.

## Usage

Simply include the script. The method `Element.scrollIntoView({options})` gets new option fields.

Supported option fields:
- vertical: scalar between 0 and 1. Default = 0. The value 0 aligns the
    top of the element with the top of the view, 1 aligns the bottom with the
    bottom, and 0.5 (default) puts the center in the center.
- horizontal: scalar between 0 and 1. Default = 0. Functions like vertical.
- center: boolean. Default = false. Forces vertical = horizontal = 0.5.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
[2]: https://www.w3.org/Bugs/Public/show_bug.cgi?id=17152
