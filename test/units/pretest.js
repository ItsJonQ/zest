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