/**
 * Pre Tests
 * Check to make sure jQuery is loaded
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