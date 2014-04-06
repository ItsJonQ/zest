(function (undefined) { "use strict";


// TEST STUFF

// window.a = _Z('article');
// a.addClass('okay not-okay bbbb');
// a.toggleClass('okay');

// window.ul = _Z('ul');
// console.log(ul.els());
// ul.filter(function(el){
//     return el.classList.contains('nav');
// });
// console.log(ul.els());

window.x = _Z('ul.column-list');
console.log('OK',x.els());

window.y = x.find('li');
console.log(y);

window.b = document.createElement('li');
b.innerHTML = 'ENYA';

var notify = function() {
    console.log('You just added a class');
};

x.listen('addClass', notify);

// a.removeClass('bbbb');
// console.log(a);
// window.b = a.find('h2');
// b.addClass('oMg');

// var eventtt = function() {
//     console.log('Hovered');
// };


// b.addEvent('mouseenter', eventtt);
// b.removeEvent('mouseenter', eventtt);
// b.addEvent('mouseenter', eventtt);
// b.addEvent('click', eventtt);
// b.removeAllEvents();
// b.addEvent('click', eventtt);

// b.setAttribute('data-okay', 'sured');

// console.log(b.parent());


// window.c = _Z('#sticky');

})();
