(function (undefined) { "use strict";

    /**
     * @constants
     */
    var _window = window;
    var _document = document;


    /**
     * ZEST
     * Create a new "Zest" class
     *
     * @category class
     *
     * @namespace  _z
     *
     * @param { string } [ selectors ] Selector(s) to be used to retrieve elements with from the DOM
     */
    var _z = function(selectors) {
        // Creates and returns a new Zest object
        return new Zest(selectors);
    };

    /**
     * @category constructor
     *
     * @namespace  Zest
     *
     * @param { string } [ selectors ] Selector(s) to be used to retrieve elements with from the DOM
     */
    var Zest = function(selectors) {
        // Return false if selectors is not defined
        if(!selectors) {
            return false;
        }

        // Construct the Zest object with the defined selectors
        this.construct(selectors);

        // Returning the Zest object
        return this;

    };


    /**
     * construct
     *
     * @private
     * @category util
     *
     * @param { string } [ selectors ] Selector to retrieve from the DOM
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.construct = function(selectors) {
        // Defining the Zest object's original selectors
        this.selectors = selectors;
        // Defining Zest's _el (elements)
        this._el = this.parseSelector(selectors);
        // Defining the length (count) of elements
        this.length = this._el.length;

        this._events = {};

        // Returning the Zest object
        return this;

    };

    /**
     * parseSelector
     * Parsing selector to see if we can use getElementsBy methods instead of querySelector (performance)
     *
     * @private
     * @category util
     *
     * @param { string } [ selectors ] Selector to retrieve from the DOM
     * @returns { object } Returns a nodeList
     */
    Zest.prototype.parseSelector = function(selector) {
        // Return if the selector is not defined
        if(!selector) {
            return false;
        }

        // Defining els to set/return
        var els;
        var firstEl = selector[0];
        var hasId = selector.indexOf("#") !== -1;
        var hasClass = selector.indexOf(".") !== -1;

        // Contains Spaces (More complicated selector query)
        if(selector.indexOf(" ") !== -1) {

            // Return a querySelector
            els = _document.querySelectorAll(selector);

        // Does not contain spaces. Might qualify for the fast _document.getElement method
        } else {

            // Check if the selector contains combined selectors
            // Example: #id-of-element.class-of-element

            // Test for #id.class-name
            // If string contains "#" or "."
            if(hasId && hasClass) {
                // Return a querySelector
                els = _document.querySelectorAll(selector);
            }
            // Test for tagName
            // If string doesn't start with # or .
            else if(firstEl.indexOf("#") !== -1 || firstEl.indexOf(".") !== -1) {
                // But, if string contains # or .
                if(hasId || hasClass) {
                    // Return a querySelector
                    els = _document.querySelectorAll(selector);
                }
            }
            // Otherwise, good to go with _document.getElement(s)By method
            else {
                // Get by ID (#)
                if(hasId) {
                    selector = selector.replace("#", "");
                    els = _document.getElementById(selector);
                }

                // Get by ClassName
                else if(hasClass) {
                    selector = selector.replace(".", "");
                    els = _document.getElementsByClassName(selector);
                }

                // Get by TagName
                else {
                    els = _document.getElementsByTagName(selector);
                }
            }

        }

        // Returning the els
        return els;

    };

    /**
     * parseTo
     * Parsing an item to something else
     *
     * @public
     * @category util
     *
     * @param { string } [ item ] Item/subject to convert
     * @param { string } [ type ] Type of item to convert to
     * @returns { object } Returns whatever is specified by the type @param
     */
    Zest.prototype.parseTo = function(item, type) {
        // Return false if item or type is not defined
        if(!item || !type || typeof type !== "string") {
            return false;
        }

        // Converting type to lowercase
        type = type.toLowerCase();

        // Defining the output
        var output;

        // Switchcase the type
        switch(type)
        {
            // if the type is an array
            case "array":
                // split the item by " " (spaces) and redefine output with array
                output = item.split(" ");
                break;

            default:
                // output false (default)
                output = false;
            }

        // Return the output
        return output;

    };

    /**
     * _addClass
     * Private method to add class to a DOM element (this)
     *
     * @private
     *
     * @param { string } [ className ] The class name to be added to the element
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype._addClass = function(className) {
        // Return "this" if className is not defined
        if(!className) {
            return this;
        }

        // If classes are an array (multiple classes)
        if(className instanceof Array) {
            // Loop through the classNames
            for(var i = 0, len = className.length; i < len; i++) {
                // Add the classNames to "this" (el)
                this.classList.add(className[i]);
            }
        } else {
            // Add the individual className to "this" (el)
            this.classList.add(className);
        }

        // Return "this" (el)
        return this;

    };


    /**
     * _removeClass
     * Private method to remove class from a DOM element (this)
     *
     * @private
     *
     * @param { string } [ className ] The class name to be removed from the element
     */
    Zest.prototype._removeClass = function(className) {
        // Return "this" if className is not defined
        if(!className) {
            return this;
        }

        // If classes are an array (multiple classes)
        if(className instanceof Array) {
            // Loop through the classNames
            for(var i = 0, len = className.length; i < len; i++) {
                // Add the classNames to "this" (el)
                this.classList.remove(className[i]);
            }
        } else {
            // Add the individual className to "this" (el)
            this.classList.remove(className);
        }

        // Return "this" (el)
        return this;

    };

    /**
     * _visible
     * Private method to check if an element is visible in the DOM
     *
     * @private
     *
     * @param { string } [ className ] The class name to be removed from the element
     * @source: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
     */
    Zest.prototype._visible = function() {
        // Defining the coordinates of the element
        var coordinates = this.getBoundingClientRect();

        // Returning the calculations
        return (
            coordinates.top >= 0 &&
            coordinates.left >= 0 &&
            coordinates.bottom <= (_window.innerHeight || _document.documentElement.clientHeight) &&
            coordinates.right <= (_window.innerWidth || _document.documentElement.clientWidth)
        );
    };



    /**
     * el
     * Returns the first element from the _el nodeList
     *
     * @public
     *
     * @return { DOM element }
     */
    Zest.prototype.el = function() {
        return this._el[0];
    };

    /**
     * els
     * Returns the _el nodeList
     *
     * @public
     *
     * @return { nodeList }
     */
    Zest.prototype.els = function() {
        return this._el;
    };


    /**
     * asArray
     * Returns the _el nodeList as an array
     *
     * @public
     *
     * @return { array } Returns the _el nodeList as an array
     */
    Zest.prototype.asArray = function() {
        // Creating an empty array to return
        var els = [];
        // Looping through the _el nodeList
        this.each(function(i) {
            els[i] = this;
        });
        // Returning the els array
        return els;
    };

    /**
     * array
     * @alias of the asArray method
     *
     * @public
     *
     * @return { array } Returns the _el nodeList as an array
     */
    Zest.prototype.array = function() {
        return this.asArray();
    };



    /**
     * addClass
     * Adding a class (or multiple classes) to the element(s) in _el
     *
     * @public
     *
     * @param { string } [ className ] The class to be added to the element(s)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.addClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== 'string') {
            return this;
        }

        // Parse: String to array if className contains a space
        // This indicates that there are multiple classes to apply
        if(className.indexOf(" ") !== -1) {
            // redefine className with the parse [array] version
            className = this.parseTo(className, "array");
        }

        // Looping through all the els
        this.forEach(function(el) {
            this._addClass.call(el, className);
        });

        // Returning Zest
        return this;

    };

    /**
     * hasClass
     * Checking to see if the first element has a certain class
     *
     * @public
     *
     * @param { string } [ className ] Checking the el for this class
     * @returns { boolean } Returns either true or false, whether or not the el has the class
     */
    Zest.prototype.hasClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== 'string') {
            return this;
        }

        // Returning hasClass status (true or false)
        return this._el[0].classList.contains(className);
    };

    /**
     * removeClass
     * Removing a class (or multiple classes) to the element(s) in _el
     *
     * @public
     *
     * @param { string } [ className ] The class to be removed to the element(s)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== 'string') {
            return this;
        }

        // Parse: String to array if className contains a space
        // This indicates that there are multiple classes to apply
        if(className.indexOf(" ") !== -1) {
            // redefine className with the parse [array] version
            className = this.parseTo(className, "array");
        }

        // Looping through all the els
        this.forEach(function(el) {
            this._removeClass.call(el, className);
        });

        // Returning Zest
        return this;

    };

    /**
     * toggleClass
     * Toggling a class for the element(s) in _el
     *
     * @public
     *
     * @param { string } [ className ] The class to be toggled
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.toggleClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== 'string') {
            return this;
        }

        // Looping through all the els
        this.each(function() {
            // If the el has the class of className
            if(this.classList.contains(className)) {
                // remove the class
                this.classList.remove(className);
            } else {
                // add the class
                this.classList.add(className);
            }
        });

        // Returning Zest
        return this;

    };

    /**
     * show
     * Showing all the elements in the DOM
     *
     * @public
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.show = function() {
        // Looping through all the els
        this.each(function() {
            // Setting all the els to display: block
            this.style.display = 'block';
        });

        // Returning Zest
        return this;

    };

    /**
     * hide
     * Hiding all the elements in the DOM
     *
     * @public
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.hide = function() {
        // Looping through all the els
        this.each(function() {
            // Setting all the els to display: block
            this.style.display = 'none';
        });

        // Returning Zest
        return this;

    };

    /**
     * Toggle
     * Toggling the visibility of the elements in the DOM
     *
     * @public
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.toggle = function() {
        // Looping through all the els
        this.forEach(function(el) {
            // If the element is visible
            if(el.clientHeight > 0) {
                // Setting the element as display: none
                el.style.display = 'none';
            } else {
                // Setting the element as display: block
                el.style.display = 'block';
            }
        });

        // Returning Zest
        return this;

    };

    /**
     * clientRect
     * Getting the getBoundingClientRect object of the first _el
     *
     * @public
     *
     * @return { object } Returns an object
     * {
     *      bottom,
     *      height,
     *      left,
     *      right,
     *      top,
     *      width
     * }
     */
    Zest.prototype.clientRect = function() {
        // Returning the getBoundginClientRect object of the first _el
        return this._el[0].getBoundingClientRect();
    };

    // Public: Combining multiple nodeLists together
    /**
     * combine
     * Combining multiple nodeLists together
     *
     * @public
     *
     * @param { string } [ arguments ] Selectors used to grab elements from the DOM with
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.combine = function() {
        // Slicing arguments into workable array
        var args = Array.prototype.slice.call(arguments);
        // Defining the combined array were node elements will be pushed
        var combined = [];
        // Looping through the arguments
        for(var i = 0, len = args.length; i < len; i++) {
            // Skip the argument if it is not a string
            if(typeof args[i] !== "string") {
                continue;
            }
            // Get a nodeList of the argument
            var nodes = _document.querySelectorAll(args[i]);
            // Loop through the nodeList
            for(var index = 0, nodeLength = nodes.length; index < nodeLength; index++) {
                // Adding the node to the combined array
                combined.push(nodes[index]);
            }
        }

        // Updating Zest's _el with original elements concated with new combined node elements
        this._el = this.asArray().concat(combined);
        // Updating Zest's length (count)
        this.length = this._el.length;

        // Returning Zest
        return this;

    };

    /**
     * each
     * Looping through each element, where "this" represents the element within the callback function
     *
     * @public
     *
     * @param  { function } [ callback ] The callback function
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.each = function(callback) {
        // Return Zest if callback is invalid
        if(!callback || typeof callback !== 'function') {
            return this;
        }

        // Defining variables for loop
        var i = -1;
        var len = this.length;
        // Loop through the elements
        while( ++i < len ) {
            // Fire the callback
            // Params: {
            //     this._el[i]: the element as "this"
            //     i: the index of the element within the loop
            // }
            callback.call(this._el[i], i, this._el[i]);
        }

        // Returning Zest
        return this;

    };

    /**
     * forEach
     * Looping through each element
     *
     * @public
     *
     * @param  { function } [ callback ] The callback function
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.forEach = function(callback) {
        // Return Zest if callback is invalid
        if(!callback || typeof callback !== 'function') {
            return this;
        }

        // Defining variables for loop
        var i = -1;
        var len = this.length;
        // Loop through the elements
        while( ++i < len ) {
            // Fire the callback
            // Params: {
            //     this._el[i]: the element as "this"
            //     i: the index of the element within the loop
            // }
            callback.call(this, this._el[i], i);
        }

        // Returning Zest
        return this;

    };

    /**
     * addEvent
     * Adding events to the element(s)
     *
     * @public
     *
     * @param  { event } [ event ] The name of the event (eg. 'click', 'mouseenter', etc..)
     * @param  { string } [ handler ] The callback function for the event
     * @param  { boolean } [ capture ] The capture status (true or false)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.addEvent = function(event, handler, capture) {
        // Return Zest if event or handler is invalid
        if( !event || typeof event !== 'string' ||
            !handler || typeof handler !== 'function')
        {
            return this;
        }

        // Looping through all the els
        this.forEach(function(el){

            // Add el to _events if not present
            if(!(el in this._events)) {
                this._events[el] = {};
            }

            // Add "event" to _events if not present (as an array)
            if(!(event in this._events[el])) {
                this._events[el][event] = [];
            }

            // Pusing the event handler and capture to the new "event" within the _events array
            this._events[el][event].push([handler, capture]);

            // Assign the event listener of the "event" to the el
            el.addEventListener(event, handler, capture);

        });

        // Return Zest
        return this;

    };

    /**
     * removeEvent
     * Removing events from the element(s)
     *
     * @public
     *
     * @param  { event } [ event ] The name of the event (eg. 'click', 'mouseenter', etc..)
     * @param  { string } [ handler ] The callback function for the event
     * @param  { boolean } [ capture ] The capture status (true or false)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeEvent = function(event, handler, capture) {
        // Return Zest if event or handler is invalid
        if(!event || typeof event !== 'string') {
            return this;
        }

        // Defining self
        var self = this;

        // Looping through all the els
        this.forEach(function(el){
            // if the el is in _events
            if(el in this._events) {
                // Define events from _events of el
                var events = this._events[el];
                // if the event argument is in events(_events)
                if(event in events) {
                    // Define handlers from events
                    var handlers = events[event];
                    // Loop through all the handlers
                    for(var i = handlers.length; i--;) {

                        // Define the individual handler
                        var eventHandler = handlers[i];

                        // Defining handler from argument (or _events array)
                        handler = handler ? handler: eventHandler[0];
                        // Defining capture from argument (or _events array)
                        capture = capture ? capture : eventHandler[1];

                        // Remove the event eventHandler from the el node
                        el.removeEventListener(event, handler, capture);

                        // // Remove the handler from the event handlers list
                        // handlers.splice(i, 1);

                    }
                    // Delete the event key from _events
                    setTimeout(function(){
                        delete self._events[el][event];
                    }, 16);
                }
            }

        });

        // Return Zest
        return this;

    };

    /**
     * removeAllEvent
     * Removing all the events from the element(s)
     *
     * @public
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeAllEvents = function() {
        // Looping through events
        for(var event in this._events) {
            for(var key in this._events[event]) {
                // Removing events
                this.removeEvent(key);
            }
        }

        // Return Zest
        return this;

    };

    /**
     * empty
     * Empty / remove all the elements from the _el node elements
     *
     * @public
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.empty = function() {
        // Looping through the element(s)
        this.forEach(function(el){
            // Looping through all the element's child nodes
            while(el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });

        // Return Zest
        return this;

    };

    /**
     * find
     * Finding elements within the origin element(s)
     *
     * @public
     *
     * @param  { string } [ selectors ] Selectors to "find" within the original _el elements
     * @returns { object } Returns a new Zest object class (with original elements and newly found elements combined)
     */
    Zest.prototype.find = function(selectors) {
        // Return Zest if selectors is not defined
        if(!selectors) {
            return this;
        }

        // Return a new Zest() with the original selectors + find selectors
        return _z(this.selectors + ' ' + selectors);

    };

    /**
     * html
     * Replacing the innerHTML of the element(s)
     *
     * @public
     *
     * @param  { string } [ context ] Context/content to replace within the _el elements
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.html = function(context) {
        // Return the innerHTML if the context is not defined
        if(!context) {
            return this._el[0].innerHTML;
        }

        // Looping through the element(s)
        this.forEach(function(el){
            // Updating the innerHTML of the element
            el.innerHTML = context;
        });

        // Return Zest
        return this;

    };


    /**
     * inViewport
     * Returns boolean (true/false) if the first dom element is visible in the viewport
     *
     * @public
     *
     * @returns { boolean } Returns true/false whether or not the first element of the Zest object is visible in the viewport
     */
    Zest.prototype.inViewport = function() {

        // Definining the Viewport and element coordinates
        var html = _document.documentElement;
        var coordinates = this.clientRect();

        // Returning true/false if element is visible
        return (!!coordinates && coordinates.bottom > 0 && coordinates.right > 0 && coordinates.top < html.clientHeight && coordinates.left < html.clientWidth);

    };

    /**
     * parent
     * Returning the parent node element from the Element(s)
     *
     * @public
     *
     * @returns { array } Returns an array of parent DOM elements
     */
    Zest.prototype.parent = function() {
        // Creating an empty array to return
        var parents = [];
        // Looping through the _el nodeList
        this.each(function(i) {
            parents[i] = this.parentNode;
        });

        // Returning the parents array
        return parents;

    };

    /**
     * remove
     * Removing the element(s) from the DOM
     *
     * @public
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.remove = function() {
        // Looping through the element(s)
        this.forEach(function(el){
            // Remove all events from the Zest object
            this.removeAllEvents();
            // Removing the el from the DOM
            el.parentNode.removeChild(el);
        });

        // Updating the length
        this.length = this._el.length;

        // Return Zest
        return this;

    };


    /**
     * getAttribute
     * Getting attributes for the first element
     *
     * @public
     *
     * @param { string } [ attribute ] The name of the attribute to get
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.getAttribute = function(attribute) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== 'string')
        {
            return this;
        }

        // Returning the attribute
        return this._el[0].getAttribute(attribute);

    };

    /**
     * setAttribute
     * Setting attributes for the element(s)
     *
     * @public
     *
     * @param { string } [ attribute ] The name of the attribute to target
     * @param { string } [ data ] The data to be set / updated
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.setAttribute = function(attribute, data) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== 'string' ||
            !data || typeof data !== 'string')
        {
            return this;
        }

        // Looping through all the els
        this.forEach(function(el) {
            el.setAttribute(attribute, data);
        });

        // Return Zest
        return this;

    };

    /**
     * removeAttribute
     * Removing attributes for the element(s)
     *
     * @public
     *
     * @param { string } [ attribute ] The name of the attribute to target
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeAttribute = function(attribute) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== 'string') {
            return this;
        }

        // Looping through all the els
        this.forEach(function(el) {
            el.removeAttribute(attribute);
        });

        // Return Zest
        return this;

    };

    /**
     * scrollIntoView
     * Scrolling the browser to the first element in _el
     *
     * @public
     *
     * @param { boolean } [ true / false ] Boolean to pass into the JS scrollIntoView method
     * True: Scroll so that the element is at the top of the window
     * False: scroll so that the lement is at the bottom of the window
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.scrollIntoView = function(alignment) {
        // Setting the default value for aligment if not defined
        if(alignment === undefined) {
            alignment = true;
        }

        // Scroll into view for the first element
        this._el[0].scrollIntoView(alignment);

        // Return Zest
        return this;

    };



    /**
     * Global
     * Adding Zest to the global window
     */

    // Adding Zest's _z namespace to global window
    if(!window._z) {
        window._z = _z;
    }

    // Adding Zest to global window
    if(!window.Zest) {
        window.Zest = _z;
    }

    return _z;

})();

// TEST STUFF

window.a = _z('article');
a.addClass('okay not-okay bbbb');
a.toggleClass('okay');
// a.removeClass('bbbb');
// console.log(a.asArray());
// window.b = a.find('h2');
// b.addClass('oMg');

// var eventtt = function() {
//     console.log('Hovered');
// };


// b.addEvent('mouseenter', eventtt);
// b.removeEvent('mouseenter', eventtt);
// b.addEvent('mouseenter', eventtt);
// b.removeAllEvents();
// b.addEvent('mouseenter', eventtt);

// b.setAttribute('data-okay', 'sured');

// console.log(b.parent());


// window.c = _z('#sticky');