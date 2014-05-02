(function (undefined) { "use strict";


// TEST STUFF

window.a = Z$('#sticky');
window.b = Z$('body');
window.c = Z$('.brand');
window.d = Z$('ul li');
window.e = Z$('.article h1');
// window.f = Z$('#header span');

window.ping = function() { console.log('Clicked the H1'); };

b.on('click', 'h1', ping);
a.on('click', function(e) {
    console.log('Clicked the #sticky');
});

b.on('click', 'a', function(e) {
    e.preventDefault();
    e.stopPropagation();
<<<<<<< HEAD:misc/test.js
    console.log('dsa');
=======
    console.log('Clicked a link in the body');
>>>>>>> b5c111ca4d96f4df9c6674ede5adcf5120ab7003:test.js
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
