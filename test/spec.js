/* eslint-env node, browser, jasmine */
"use strict";

var dispatch = require("..");
var createEvent = require("create-event");
var on = require("dom-events").on;

var triggered = false;
var element = window.document.createElement("div");
document.body.appendChild(element);
var handler = function () {
    triggered = true;
};
var eventType = "click";
var event = createEvent(eventType);

on(element, eventType, handler);

describe("dispatch-event", function(){
    describe("throws", function(){
        it("when not provided arguments", function(){
            expect(function(){
                dispatch();
            }).toThrow();
        });
        it("when provided one argument", function(){
            expect(function(){
                dispatch(element);
            }).toThrow();
        });
        it("when first argument is not an element", function(){
            expect(function(){
                dispatch("foo", event, eventType);
            }).toThrow();
        });
        it("when second argument is not an object", function(){
            expect(function(){
                dispatch(element, "foo", eventType);
            }).toThrow();
        });
    });
    it("triggers an event", function() {
        dispatch(element, event, eventType);
        expect(triggered).toEqual(true);
    });
});
