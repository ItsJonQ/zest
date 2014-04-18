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
a.on('click', function() {
    console.log('sticky');

});

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
