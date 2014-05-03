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

module("Class", {
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
        ".addClass worked correctly." );

    equal(
        span.getAttribute('class'),
        'new-guy',
        ".addClass added a new class correctly." );
});

test("Zest().addClass should be able to add multiple classes", function() {
    expect(2);

    ok( span.addClass('new-guy is-cool very-cool'),
        ".addClass worked correctly." );

    equal(
        span.getAttribute('class'),
        'new-guy is-cool very-cool',
        ".addClass added a new class correctly." );
});

test("Zest().addClass is chainable", function() {
    expect(1);

    ok( span.addClass('new-class')
        .removeClass('new-class'),
        ".addClass chaining is working." );
});


// .hasClass
test("Zest().hasClass should be able detect classes", function() {
    expect(3);

    // Adding a test class to the span to check for hasClass
    span.addClass('new-guy');

    ok( span.hasClass('new-guy'),
        ".hasClass worked correctly." );

    equal(
        span.hasClass('new-guy'),
        true,
        ".hasClass can detect a class correctly." );

    equal(
        span.hasClass('fake-guy'),
        false,
        ".hasClass can detect a class is not present correctly." );
});


// .removeClass
test("Zest().removeClass should be able to remove a single class", function() {
    expect(2);

    // Adding a test class to the span to test for removeClass
    span.addClass('the new-guy too-cool');

    ok( span.removeClass('the'),
        ".removeClass worked correctly." );

    equal(
        span.hasClass('the'),
        false,
        ".removeClass removed a class correctly." );
});

test("Zest().removeClass should be able to remove multiple classes", function() {
    expect(2);

    // Adding a test class to the span to test for removeClass
    span.addClass('new-guy too-cool');
    span.removeClass('new-guy too-cool');

    equal(
        span.hasClass('new-guy'),
        false,
        ".removeClass removed a class correctly." );

    equal(
        span.hasClass('too-cool'),
        false,
        ".removeClass removed a class correctly." );
});

test("Zest().removeClass is chainable", function() {
    expect(1);

    ok( span
        .addClass('new-class-one new-class-two')
        .removeClass('new-class-one')
        .removeClass('new-class-two'),
        ".removeClass chaining is working." );
});

/**
 * Transversing
 */

var el;

module("Transversing");

// .child
test("Zest().child() should be able to locate the first child", function() {
    expect(9);

    el = Zest('article');
    var child = el.child();

    ok( child,
        ".child() method is working." );

    equal( child instanceof Zest, true,
        ".child() should return a Zest object." );

    equal( child._el[0], el.firstEl().children[0],
        ".child() works the same as the native .children[0] method.");

    ok( child.length,
        ".child() object should have a .length attribute.");

    equal( child.length, 1,
        ".child() length should only be 1." );

    ok( child.selector,
        ".child() object should have a .selector attribute.");

    equal( child.selector.indexOf(el.selector) >= 0, true,
        ".child().selector contain the selector of the parent.");

    equal( el.selector === child.selector, false,
        ".child().selector should not be the same as the parent's.");

    ok( child.addClass('new-class').removeClass('new-class'),
        ".child() should be chainable." );
});


// .children
test("Zest().children() should be able to locate the all child nodes", function() {
    expect(9);

    el = Zest('article');
    var children = el.children();

    ok( children,
        ".children() method is working." );

    equal( children instanceof Zest, true,
        ".children() should return a Zest object." );

    equal( children.length, el.firstEl().children.length,
        ".children() works the same as the native .children method.");

    ok( children.length,
        ".children() object should have a .length attribute.");

    equal( children.length > 1, true,
        ".children() length should only more than 1." );

    ok( children.selector,
        ".children() object should have a .selector attribute.");

    equal( children.selector.indexOf(el.selector) >= 0, true,
        ".children().selector contain the selector of the parent.");

    equal( el.selector === children.selector, false,
        ".children().selector should not be the same as the parent's.");

    ok( children.addClass('new-class').removeClass('new-class'),
        ".children() should be chainable." );
});


// .el
test("Zest().el should return the first element in the _el array", function() {
    expect(3);

    el = Zest('span');
    var firstEl = el.el();

    ok( firstEl,
        ".el() is working." );

    equal( firstEl instanceof Zest, false,
        ".el() should not be an instance of Zest." );

    equal( firstEl, el._el[0],
        ".el() should be the first DOM element in the _el array." );
});


// .els
test("Zest().els should return the elements in the _el array", function() {
    expect(3);

    el = Zest('span');
    var firstEl = el.el();

    ok( firstEl,
        ".el() is working." );

    equal( firstEl instanceof Zest, false,
        ".el() should not be an instance of Zest." );

    equal( firstEl, el._el[0],
        ".el() should be the first DOM element in the _el array." );
});


// .find
test("Zest().find() should be able to locate selectors within", function() {
    expect(10);

    el = Zest('article');
    var elFind = el.find('span');

    ok( elFind,
        ".find() method is working." );

    equal( elFind instanceof Zest, true,
        ".find() should return a Zest object." );

    equal( Zest('article span').length, elFind.length,
        ".find() works as expected.");

    equal( elFind.find('.fake-selector')._el.length, 0,
        ".find()._el should be empty if nothing is found.");

    equal( elFind.find('.fake-selector').length, 0,
        ".find().length should be zero if nothing is found.");

    ok( elFind.length,
        ".find() should have a length attribute." );

    ok( elFind.selector,
        ".find() should have a selector attribute." );

    equal( elFind.selector.indexOf(el.selector) >= 0, true,
        ".find().selector contain the selector of the parent.");

    equal( elFind.selector === el.selector, false,
        ".find().selector should not be the same as the parent's.");

    ok( elFind.addClass('new-class').removeClass('new-class'),
        ".find() should be chainable." );
});


// .first
test("Zest().first() should return the first element as a Zest object", function() {
    expect(6);

    el = Zest('span');
    var elFirst = el.first();

    ok( elFirst,
        ".first() method is working." );

    equal( elFirst instanceof Zest, true,
        ".first() should return a Zest object." );

    ok( elFirst.length,
        ".first() should have a length attribute." );

    ok( elFirst.selector,
        ".first() should have a selector attribute." );

    equal( elFirst._el[0], el._el[0],
        ".first() should contain the first element.");

    ok( elFirst.addClass('new-class').removeClass('new-class'),
        ".first() should be chainable." );
});
