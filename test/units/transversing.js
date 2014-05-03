/**
 * Transversing
 */

var el;

module("Transversing Methods");

// .child
test("Zest().child should be able to locate the first child", function() {
    expect(7);

    el = Zest('article');
    var child = el.child();

    ok( child,
        ".child() method is working." );

    ok( child.selector,
        ".child() object should have a .selector attribute.");

    equal( child instanceof Zest, true,
        ".child() should return a Zest object." );

    equal( child.length, 1,
        ".child() length should only be 1." );

    equal( child.selector.indexOf(el.selector) >= 0, true,
        ".child().selector contain the selector of the parent.");

    equal( el.selector === child.selector, false,
        ".child().selector should not be the same as the parent's.");

    ok( child.addClass('new-class').removeClass('new-class'),
        ".child() is chainable." );

});