(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../units/pretest.js');
require('../units/setup.js');
require('../units/selectors.js');
require('../units/classes.js');

},{"../units/classes.js":2,"../units/pretest.js":3,"../units/selectors.js":4,"../units/setup.js":5}],2:[function(require,module,exports){
/**
 * Classes
 */

// .addClass
test("Zest().addClass should be able to add a single class", function() {
    ok( Zest('span').addClass('new-guy'),
        "Zest().addClass worked correctly." );

    equal(
        $('span').hasClass('new-guy'),
        true,
        "Zest().addClass added a new class correctly." );
});

test("Zest().addClass should be able to add multiple classes", function() {
    ok( Zest('span').addClass('the new-guy is-cool'),
        "Zest().addClass worked correctly." );

    var $span = $('span');

    equal(
        $span.hasClass('the'),
        true,
        "Zest().addClass added a new class correctly." );

    equal(
        $span.hasClass('new-guy'),
        true,
        "Zest().addClass added a new class correctly." );

    equal(
        $span.hasClass('is-cool'),
        true,
        "Zest().addClass added a new class correctly." );
});

test("Zest().addClass is chainable", function() {
    ok( Zest('span').addClass('new-class').removeClass('new-class'),
        "Zest().addClass chaining is working." );
});


// .hasClass
test("Zest().rhasClass should be able detect classes", function() {
    ok( Zest('span').hasClass('new-guy'),
        "Zest().hasClass worked correctly." );

    var $span = $('span');

    equal(
        $span.hasClass('new-guy'),
        true,
        "Zest().hasClass can detect a class correctly." );

    equal(
        $span.hasClass('fake-guy'),
        false,
        "Zest().hasClass can detect a class is not present correctly." );
});


// .removeClass
test("Zest().removeClass should be able to remove a single class", function() {
    ok( Zest('span').removeClass('the'),
        "Zest().removeClass worked correctly." );

    equal(
        $('span').hasClass('the'),
        false,
        "Zest().removeClass removed a class correctly." );
});

test("Zest().removeClass should be able to remove multiple classes", function() {
    ok( Zest('span').removeClass('new-guy is-cool'),
        "Zest().removeClass worked correctly." );

    var $span = $('span');

    equal(
        $span.hasClass('new-guy'),
        false,
        "Zest().removeClass removed a class correctly." );

    equal(
        $span.hasClass('is-cool'),
        false,
        "Zest().removeClass removed a class correctly." );
});

test("Zest().removeClass is chainable", function() {
    ok( Zest('span').addClass('new-class-one new-class-two')
        .removeClass('new-class-one')
        .removeClass('new-class-two'),
        "Zest().removeClass chaining is working." );
});
},{}],3:[function(require,module,exports){
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
    ok( Zest,
        "Zest is defined." );

    equal( typeof Zest, "function",
        "Zest is a function." );
});
},{}],4:[function(require,module,exports){
/**
 * Selector Parsing
 */

test("Zest('selector') should be an instance of Zest", function() {

    // Zest() instanceof Zest
    equal( Zest('span') instanceof Zest, true,
        "Zest('selector') is an instanceof Zest" );

    // Z$ instanceof Zest
    equal( Z$('span') instanceof Zest, true,
        "Z$('selector') is an instanceof Zest" );

});

test("Zest('selector') should be grabbing the correct selectors", function() {

    // Selectors by ID
    ok( Zest('#post-1'),
        "Zest() #selector is working." );

    equal( Zest('#post-1')._el[0], $('#post-1')[0],
        "Zest's #selector element is correct.");

    // Selectors by className
    ok( Zest('.spanzy'),
        "Zest() #selector is working." );

    equal( Zest('.spanzy')._el[0], $('.spanzy')[0],
        "Zest's .selector element is correct.");

    // Selectors by tagName
    ok( Zest('article'),
        "Zest() tag elector is working.");

    equal( Zest('article')._el[0], $('article')[0],
        "Zest's selector element is correct.");

    // Selectors (complex) (example: #id div a.link-class)
    ok( Zest('article span.spanzy'),
        "Zest() complex selector parsing is working." );

    equal( Zest('article span.spanzy')._el[0], $('article span.spanzy')[0],
        "Zest's complex selector element is correct.");

    // Selectors with pseudo (example: .class:not(.another-class))
    ok( Zest('span:not(.inactive)'),
        "Zest() with pseudo selectors is working." );

    equal( Zest('span:not(.inactive)')._el[0], $('span:not(.inactive)')[0],
        "Zest's pseudo selector element is correct.");

});
},{}],5:[function(require,module,exports){
/**
 * Test Setup
 */

},{}]},{},[1])