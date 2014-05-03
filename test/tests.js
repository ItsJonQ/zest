/*!
 * Zest
 * A light-weight DOM library
 * v0.0.1 (https://github.com/ItsJonQ/Zest)
 * Copyright 2014 Jon Q
 * Licensed under MIT (https://github.com/itsjonq/zest/blob/master/LICENSE)
 */

/**
 * Test Setup
 */


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

/**
 * Classes
 */

var span;

module("Class Methods", {
    setup: function() {
        span = Zest('span');
    },
    teardown: function() {
        span.setAttribute('class', '');
    }
});

// .addClass
test("Zest().addClass should be able to add a single class", function() {
    ok( span.addClass('new-guy'),
        "Zest().addClass worked correctly." );

    equal(
        span.getAttribute('class'),
        'new-guy',
        "Zest().addClass added a new class correctly." );
});

test("Zest().addClass should be able to add multiple classes", function() {
    ok( span.addClass('new-guy is-cool very-cool'),
        "Zest().addClass worked correctly." );

    equal(
        span.getAttribute('class'),
        'new-guy is-cool very-cool',
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