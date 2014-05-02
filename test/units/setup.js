/**
 * Test Setup
 */

// Creating a test div
var div = document.createElement('div');
// Adding elements into the DIV
div.innerHTML = '<article id="post-1" class="posty"><h1>Title</h1><span class="spanzy">Span 1</span><span class="spanzy">Span 2</span></article>';
// Inserting the div into the body
document.body.appendChild(div);