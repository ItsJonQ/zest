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