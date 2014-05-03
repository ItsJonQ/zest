/*!
 * Zest
 * A light-weight DOM library
 * v0.0.1 (https://github.com/ItsJonQ/Zest)
 * Copyright 2014 Jon Q
 * Licensed under MIT (https://github.com/itsjonq/zest/blob/master/LICENSE)
 */

/**
 * Pre Tests
 * Check to make sure jQuery and Zest are loaded
 */

module("Setup");

test("jQuery is loaded", function() {
    expect(3);

    ok( jQuery,
        "jQuery is defined." );

    ok( $,
        "$ is defined.");

    equal( typeof jQuery, "function",
        "jQuery is a function." );
});

test("Zest is loaded", function() {
    expect(3);

    ok( Zest,
        "Zest is defined." );

    ok( Z$,
        "Z$ is defined." );

    equal( typeof Zest, "function",
        "Zest is a function." );
});

/**
 * Selector Parsing
 */

module("Selector");

test("Zest('selector') should be an instance of Zest", function() {
    expect(2);

    // Zest() instanceof Zest
    equal( Zest('span') instanceof Zest, true,
        "Zest('selector') is an instanceof Zest" );

    // Z$ instanceof Zest
    equal( Z$('span') instanceof Zest, true,
        "Z$('selector') is an instanceof Zest" );

});

test("Zest('selector') should be grabbing the correct selectors", function() {
    expect(10);

    var byId = Zest('#post-1');
    var byClass = Zest('.spanzy');
    var bytagName = Zest('article');
    var byQuery = Zest('article span.spanzy');
    var byPseudo = Zest('span:not(.inactive)');

    // Selectors by ID
    ok( byId,
        "Zest() #selector is working." );

    equal( byId._el[0], $('#post-1')[0],
        "Zest's #selector element is correct.");

    // Selectors by className
    ok( byClass,
        "Zest() #selector is working." );

    equal( byClass._el[0], $('.spanzy')[0],
        "Zest's .selector element is correct.");

    // Selectors by tagName
    ok( bytagName,
        "Zest() tag elector is working.");

    equal( bytagName._el[0], $('article')[0],
        "Zest's selector element is correct.");

    // Selectors (complex) (example: #id div a.link-class)
    ok( byQuery,
        "Zest() complex selector parsing is working." );

    equal( byQuery._el[0], $('article span.spanzy')[0],
        "Zest's complex selector element is correct.");

    // Selectors with pseudo (example: .class:not(.another-class))
    ok( byPseudo,
        "Zest() with pseudo selectors is working." );

    equal( byPseudo._el[0], $('span:not(.inactive)')[0],
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
    expect(2);

    ok( span.addClass('new-guy'),
        "Zest().addClass worked correctly." );

    equal(
        span.getAttribute('class'),
        'new-guy',
        "Zest().addClass added a new class correctly." );
});

test("Zest().addClass should be able to add multiple classes", function() {
    expect(2);

    ok( span.addClass('new-guy is-cool very-cool'),
        "Zest().addClass worked correctly." );

    equal(
        span.getAttribute('class'),
        'new-guy is-cool very-cool',
        "Zest().addClass added a new class correctly." );
});

test("Zest().addClass is chainable", function() {
    expect(1);

    ok( span.addClass('new-class')
        .removeClass('new-class'),
        "Zest().addClass chaining is working." );
});


// .hasClass
test("Zest().rhasClass should be able detect classes", function() {
    expect(3);

    // Adding a test class to the span to check for hasClass
    span.addClass('new-guy');

    ok( span.hasClass('new-guy'),
        "Zest().hasClass worked correctly." );

    equal(
        span.hasClass('new-guy'),
        true,
        "Zest().hasClass can detect a class correctly." );

    equal(
        span.hasClass('fake-guy'),
        false,
        "Zest().hasClass can detect a class is not present correctly." );
});


// .removeClass
test("Zest().removeClass should be able to remove a single class", function() {
    expect(2);

    // Adding a test class to the span to test for removeClass
    span.addClass('the new-guy too-cool');

    ok( span.removeClass('the'),
        "Zest().removeClass worked correctly." );

    equal(
        span.hasClass('the'),
        false,
        "Zest().removeClass removed a class correctly." );
});

test("Zest().removeClass should be able to remove multiple classes", function() {
    expect(2);

    // Adding a test class to the span to test for removeClass
    span.addClass('new-guy too-cool');
    span.removeClass('new-guy too-cool');

    equal(
        span.hasClass('new-guy'),
        false,
        "Zest().removeClass removed a class correctly." );

    equal(
        span.hasClass('too-cool'),
        false,
        "Zest().removeClass removed a class correctly." );
});

test("Zest().removeClass is chainable", function() {
    expect(1);

    ok( span
        .addClass('new-class-one new-class-two')
        .removeClass('new-class-one')
        .removeClass('new-class-two'),
        "Zest().removeClass chaining is working." );
});

/**
 * Transversing
 */

var el;

module("Transversing Methods");

// .child
test("Zest().child should be able to locate the first child", function() {
    expect(7);

    el = Zest('article');
    var child = el.child();

    ok( child,
        ".child() method is working." );

    ok( child.selector,
        ".child() object should have a .selector attribute.");

    equal( child instanceof Zest, true,
        ".child() should return a Zest object." );

    equal( child.length, 1,
        ".child() length should only be 1." );

    equal( child.selector.indexOf(el.selector) >= 0, true,
        ".child().selector contain the selector of the parent.");

    equal( el.selector === child.selector, false,
        ".child().selector should not be the same as the parent's.");

    ok( child.addClass('new-class').removeClass('new-class'),
        ".child() is chainable." );

});