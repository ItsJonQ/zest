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
test("zest('selector') should be grabbing the correct selectors", function() {

    ok( zest('article'),
        "zest() tag elector is working.");

    equal( zest('article')._el[0], $('article')[0],
        "zest's selector element is correct.");

    ok( zest('#post-1'),
        "zest() #selector is working." );

    equal( zest('#post-1')._el[0], $('#post-1')[0],
        "zest's #selector element is correct.");

    ok( zest('.spanzy'),
        "zest() #selector is working." );

    equal( zest('.spanzy')._el[0], $('.spanzy')[0],
        "zest's .selector element is correct.");

    ok( zest('article span.spanzy'),
        "zest() complex selector parsing is working." );

    equal( zest('article span.spanzy')._el[0], $('article span.spanzy')[0],
        "zest's complex selector element is correct.");

});
},{}],4:[function(require,module,exports){
/**
 * Test Setup
 */

},{}]},{},[1])