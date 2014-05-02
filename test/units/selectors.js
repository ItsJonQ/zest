/**
 * Selector Parsing
 */
test("zest('selector') should be grabbing the correct selectors", function() {

    ok( zest('article'),
        "zest() tag elector is working.");

    equal( zest('article')._el[0], $('article')[0],
        "zest's selector element is correct.");

    ok( zest('#post-1'),
        "zest() #selector is working." );

    equal( zest('#post-1')._el[0], $('#post-1')[0],
        "zest's #selector element is correct.");


});