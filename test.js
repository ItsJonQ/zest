(function (undefined) { "use strict";


// TEST STUFF

window.a = Z$('article');
// a.addClass('okay not-okay bbbb');
// a.toggleClass('okay');

// window.ul = Z$('ul');
// console.log(ul.els());
// ul.filter(function(el){
//     return el.classList.contains('nav');
// });
// console.log(ul.els());

window.x = Z$('ul.column-list');
console.log('OK',x.els());

window.y = x.find('li');
console.log(y);

window.b = document.createElement('span');
b.innerHTML = 'ENYA';

var hideY = function() {
    y.toggle();
};


x.listen('addClass', hideY);

// a.removeClass('bbbb');
// console.log(a);
window.b = a.find('h2');
b.addClass('oMg');

var eventtt = function() {
    console.log('Hovered');
};


b.addEvent('mouseenter', eventtt);
// b.removeEvent('mouseenter', eventtt);
// b.addEvent('mouseenter', eventtt);
// b.addEvent('click', eventtt);
// b.removeAllEvents();
// b.addEvent('click', eventtt);

// b.setAttribute('data-okay', 'sured');

// console.log(b.parent());


// window.c = Z$('#sticky');

})();
