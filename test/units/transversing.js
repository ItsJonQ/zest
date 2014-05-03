/**
 * Transversing
 */

var el;

module("Transversing Methods");

// .child
test("Zest().child should be able to locate the first child", function() {
    expect(9);

    el = Zest('article');
    var child = el.child();

    ok( child,
        ".child() method is working." );

    equal( child instanceof Zest, true,
        ".child() should return a Zest object." );

    equal( child._el[0], el.firstEl().children[0],
        ".child() works the same as the native .children[0] method.");

    ok( child.length,
        ".child() object should have a .length attribute.");

    equal( child.length, 1,
        ".child() length should only be 1." );

    ok( child.selector,
        ".child() object should have a .selector attribute.");

    equal( child.selector.indexOf(el.selector) >= 0, true,
        ".child().selector contain the selector of the parent.");

    equal( el.selector === child.selector, false,
        ".child().selector should not be the same as the parent's.");

    ok( child.addClass('new-class').removeClass('new-class'),
        ".child() is chainable." );
});

// .children
test("Zest().child should be able to locate the all child nodes", function() {
    expect(9);

    el = Zest('article');
    var children = el.children();

    ok( children,
        ".children() method is working." );

    equal( children instanceof Zest, true,
        ".children() should return a Zest object." );

    equal( children.length, el.firstEl().children.length,
        ".children() works the same as the native .children method.");

    ok( children.length,
        ".children() object should have a .length attribute.");

    equal( children.length > 1, true,
        ".children() length should only more than 1." );

    ok( children.selector,
        ".children() object should have a .selector attribute.");

    equal( children.selector.indexOf(el.selector) >= 0, true,
        ".children().selector contain the selector of the parent.");

    equal( el.selector === children.selector, false,
        ".children().selector should not be the same as the parent's.");

    ok( children.addClass('new-class').removeClass('new-class'),
        ".children() is chainable." );

});