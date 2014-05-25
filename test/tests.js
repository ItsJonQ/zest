/*!
 * Zest
 * A light-weight DOM library
 * v0.0.4 (https://github.com/ItsJonQ/Zest)
 * Copyright 2014 Jon Q
 * Licensed under MIT (https://github.com/itsjonq/zest/blob/master/LICENSE)
 */

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