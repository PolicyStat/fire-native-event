# fire-native-event

Fires a native event.

Should be compatible with IE6+ and reasonable browsers.

It doesn't perform any validation on the provided event object.

It really just fires it, using either `Element.prototype.dispatchEvent` or `Element.prototype.fireEvent`.

``` js
// Create a native event somehow (this is out of this module's scope)
var createNativeEvent = require("create-event");
var eventType = "click";
var nativeEvent = createNativeEvent(eventType);

// Fire it on an element
var element = document.createElement("div");
var fire = require("fire-native-event");
fire(element, nativeEvent, eventType);
```
