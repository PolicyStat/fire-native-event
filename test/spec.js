/* eslint-env node, browser, jasmine */
"use strict";

var fire = require("..");
var synth = require("synthetic-dom-events");
var on = require("dom-events").on;

var triggered = false;
var element = window.document.createElement("div");
document.body.appendChild(element);
var handler = function () {
    triggered = true;
};
var eventType = "click";
var event = synth(eventType);

on(element, eventType, handler);

describe("fire-event", function(){
    describe("throws", function(){
        it("when not provided arguments", function(){
            expect(function(){
                fire();
            }).toThrow();
        });
        it("when provided one argument", function(){
            expect(function(){
                fire(element);
            }).toThrow();
        });
        it("when first argument is not an element", function(){
            expect(function(){
                fire("foo", event);
            }).toThrow();
        });
        it("when second argument is not an object", function(){
            expect(function(){
                fire(element, "foo");
            }).toThrow();
        });
    });
    it("triggers an event", function() {
        fire(element, event);
        expect(triggered).toEqual(true);
    });
});
