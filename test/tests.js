(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../units/pretest.js');
require('../units/setup.js');
require('../units/selectors.js');

},{"../units/pretest.js":2,"../units/selectors.js":3,"../units/setup.js":4}],2:[function(require,module,exports){
/**
 * Pre Tests
 * Check to make sure jQuery and Zest are loaded
 */
test("jQuery is loaded", function() {
    ok( jQuery,
        "jQuery is defined." );

    ok( $,
        "$ is defined.");

    equal( typeof jQuery, "function",
        "jQuery is a function." );
});

test("Zest is loaded", function() {
    ok( zest,
        "zest is defined." );

    equal( typeof zest, "function",
        "zest is a function." );
});
},{}],3:[function(require,module,exports){
/**
 * Selector Parsing
 */


},{}],4:[function(require,module,exports){
/**
 * Test Setup
 */
// Creating a test div
var div = document.createElement('div');
// Adding elements into the DIV
div.innerHTML = '<article id="post-1" class="posty"><h1>Title</h1><span class="spanzy">Span 1</span><span class="spanzy">Span 2</span></article>';
// Inserting the div into the body
document.body.appendChild(div);
},{}]},{},[1])