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