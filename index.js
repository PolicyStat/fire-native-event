/* eslint-env node, browser */
"use strict";

var isElement = require("lodash.iselement");

var usingDispatchEvent = function (target, event) {
    return Element.prototype.dispatchEvent.call(target, event);
};

var usingFireEvent = function (target, event, type) {
    return target.fireEvent("on" + type, event);
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

module.exports = function(target, event, type) {
    if (isElement(target) !== true) {
        throw "dispatch-event: Element not provided";
    }
    if (typeof event !== "object") {
        throw "dispatch-event: Event not provided or is not an object";
    }

    if (
        typeof type !== "string" ||
        type.length === 0
    ) {
        throw "dispatch-event: Event type not provided";
    }

    method(target, event, type);
};
