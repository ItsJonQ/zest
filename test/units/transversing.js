/**
 * Transversing
 */

var el;

module("Transversing");

// .child
test("Zest().child() should be able to locate the first child", function() {
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
        ".child() should be chainable." );
});


// .children
test("Zest().children() should be able to locate the all child nodes", function() {
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
        ".children() should be chainable." );
});


// .el
test("Zest().el should return the first element in the _el array", function() {
    expect(3);

    el = Zest('span');
    var firstEl = el.el();

    ok( firstEl,
        ".el() is working." );

    equal( firstEl instanceof Zest, false,
        ".el() should not be an instance of Zest." );

    equal( firstEl, el._el[0],
        ".el() should be the first DOM element in the _el array." );
});


// .els
test("Zest().els should return the elements in the _el array", function() {
    expect(3);

    el = Zest('span');
    var firstEl = el.el();

    ok( firstEl,
        ".el() is working." );

    equal( firstEl instanceof Zest, false,
        ".el() should not be an instance of Zest." );

    equal( firstEl, el._el[0],
        ".el() should be the first DOM element in the _el array." );
});


// .find
test("Zest().find() should be able to locate selectors within", function() {
    expect(10);

    el = Zest('article');
    var elFind = el.find('span');

    ok( elFind,
        ".find() method is working." );

    equal( elFind instanceof Zest, true,
        ".find() should return a Zest object." );

    equal( Zest('article span').length, elFind.length,
        ".find() works as expected.");

    equal( elFind.find('.fake-selector')._el.length, 0,
        ".find()._el should be empty if nothing is found.");

    equal( elFind.find('.fake-selector').length, 0,
        ".find().length should be zero if nothing is found.");

    ok( elFind.length,
        ".find() should have a length attribute." );

    ok( elFind.selector,
        ".find() should have a selector attribute." );

    equal( elFind.selector.indexOf(el.selector) >= 0, true,
        ".find().selector contain the selector of the parent.");

    equal( elFind.selector === el.selector, false,
        ".find().selector should not be the same as the parent's.");

    ok( elFind.addClass('new-class').removeClass('new-class'),
        ".find() should be chainable." );
});


// .first
test("Zest().first() should return the first element as a Zest object", function() {
    expect(8);

    el = Zest('span');
    var elFirst = el.first();

    ok( elFirst,
        ".first() method is working." );

    equal( elFirst instanceof Zest, true,
        ".first() should return a Zest object." );

    ok( elFirst.length,
        ".first() should have a length attribute." );

    ok( elFirst.selector,
        ".first() should have a selector attribute." );

    equal( elFirst._el.length, 1,
        ".first() only contain 1 element." );

    equal( elFirst.selector === el.selector, true,
        ".first().selector should be the same as the original's.");

    equal( elFirst._el[0], el._el[0],
        ".first() should contain the first element.");

    ok( elFirst.addClass('new-class').removeClass('new-class'),
        ".first() should be chainable." );
});


// .last
test("Zest().last() should return the last element as a Zest object", function() {
    expect(8);

    el = Zest('span');
    var elLast = el.last();

    ok( elLast,
        ".last() method is working." );

    equal( elLast instanceof Zest, true,
        ".last() should return a Zest object." );

    ok( elLast.length,
        ".last() should have a length attribute." );

    ok( elLast.selector,
        ".last() should have a selector attribute." );

    equal( elLast._el.length, 1,
        ".last() only contain 1 element." );

    equal( elLast.selector === el.selector, true,
        ".last().selector should be the same as the original's.");

    equal( elLast._el[this.length - 1], el._el[this.length - 1],
        ".last() should contain the last element.");

    ok( elLast.addClass('new-class').removeClass('new-class'),
        ".last() should be chainable." );
});


// .lastEl
test("Zest().lastEl() should return the last element as a web node", function() {
    expect(3);

    el = Zest('span');
    var elLast = el.lastEl();

    ok( elLast,
        ".lastEl() method is working." );

    equal( elLast instanceof Zest, false,
        ".lastEl() should not return a Zest object." );

    equal( elLast, el._el[el.length - 1],
        ".lastEl() should contain the last element.");
});


// .next()
test("Zest().next() should return the next sibling as a Zest object", function() {
    expect(8);

    el = Zest('span');
    var elNext = el.next();

    ok( elNext,
        ".next() method is working." );

    equal( elNext instanceof Zest, true,
        ".next() should return a Zest object." );

    ok( elNext.length,
        ".next() should have a length attribute." );

    ok( elNext.selector,
        ".next() should have a selector attribute." );

    equal( elNext._el.length, 1,
        ".next() only contain 1 element." );

    equal( elNext.selector === el.selector, true,
        ".next().selector should be the same as the original's.");

    equal( elNext._el[0], el._el[0].nextElementSibling,
        ".next() should contain the next node element.");

    ok( elNext.addClass('new-class').removeClass('new-class'),
        ".next() should be chainable." );
});