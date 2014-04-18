(function (undefined) { "use strict";


// TEST STUFF

window.a = Z$('#sticky');
window.b = Z$('body');
window.c = Z$('.brand');
window.d = Z$('ul li');
window.e = Z$('.article h1');
window.f = Z$('#header span');

window.ping = function() { console.log('ECHO!'); };

b.on('click', 'h1', ping);
a.on('click', function(e) {
    console.log('sticky');

});

b.on('click', 'a', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('dsa');
});

jQuery('body').on('click', 'a', function(e) {
    e.preventDefault();
    e.stopPropagation();
});

jQuery('body').on('click', ping);


// window.c = Z$('article');
// a.addClass('okay not-okay bbbb');
// a.toggleClass('okay');

// window.ul = Z$('ul');
// console.log(ul.els());
// ul.filter(function(el){
//     return el.classList.contains('nav');
// });
// console.log(ul.els());

})();
