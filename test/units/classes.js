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