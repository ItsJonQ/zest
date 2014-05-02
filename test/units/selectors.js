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