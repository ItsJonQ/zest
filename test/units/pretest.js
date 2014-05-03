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