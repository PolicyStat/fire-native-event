/* eslint-env node, browser */
"use strict";

var isElement = require("lodash.iselement");

var usingDispatchEvent = function (target, event) {
    return Element.prototype.dispatchEvent.call(target, event);
};

var usingFireEvent = function (target, event) {
    if (
        typeof event.type !== "string" ||
        event.type.length === 0
    ) {
        throw "Expected event to have property type";
    }
    return target.fireEvent("on" + event.type, event);
};

var chooseMethod = function(){

    if (typeof Element.prototype.dispatchEvent === "function") {
        return usingDispatchEvent;
    } else {
        var element = document.createElement("div");
        if (typeof element.fireEvent.call === "object") {
            return usingFireEvent;
        }
    }

};

var method = chooseMethod();

module.exports = function(target, event) {
    if (isElement(target) !== true) {
        throw "Element not provided";
    }
    if (typeof event !== "object") {
        throw "Event not provided or is not an object";
    }

    method(target, event);
};
