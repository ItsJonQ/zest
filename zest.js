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
     * @param { string } [ selector ] Selector(s) to be used to retrieve elements with from the DOM
     */
    var _z = function(selector) {
        // Creates and returns a new Zest object
        return new Zest(selector);
    };

    /**
     * @category constructor
     *
     * @namespace  Zest
     *
     * @param { string } [ selector ] Selector(s) to be used to retrieve elements with from the DOM
     */
    var Zest = function(selector) {
        // Return false if selector is not defined
        if(!selector) {
            return false;
        }

        // Construct the Zest object with the defined selector
        this._construct(selector);

        // Returning the Zest object
        return this;
    };


    /**
     * _construct
     *
     * @private
     * @category util
     *
     * @param { string } [ selector ] Selector to retrieve from the DOM
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype._construct = function(selector) {

        // Defining Zest's _el array
        this._el = [];

        // Defining Zest's _el (elements)
        if(typeof selector === "string") {
            // Parse the selector
            this._el = this._parseSelector(selector);
            // Defining the Zest object's original selector
            this.selector = selector;
        }
        // Check to see if the selector is an instance of Zest
        if(selector instanceof Zest) {
            // Get the els from the Zest object
            this._el = selector.els();
        }
        // Check to see if the selector is an array of DOM elements
        if(selector instanceof Array) {
            // Define the loop variables
            var i = -1;
            var length = selector.length;
            // Loop through the array
            while(++i < length){
                // If the selector is a node object
                if(selector[i].nodeType === 1) {
                    // Push it to the _el array
                    this._el.push(selector[i]);
                }
            }
        }
        // Check to see if the selector is an individual Node/HTML element
        if(selector instanceof HTMLElement || selector instanceof Node) {
            this._el.push(selector);
        }

        // Defining the length (count) of elements
        this.length = this._el.length;

        this._events = {};

        // Returning the Zest object
        return this;
    };

    /**
     * _parseSelector
     * Parsing selector to see if we can use getElementsBy methods instead of querySelector (performance)
     *
     * @private
     * @category util
     *
     * @param { string } [ selector ] Selector to retrieve from the DOM
     * @param { string } [ parent ] Parent node element to search
     * @returns { object } Returns a nodeList
     */
    Zest.prototype._parseSelector = function(selector, parent) {
        // Return if the selector is not defined
        if(!selector) {
            return false;
        }

        var _dom = parent ? parent : _document;

        // Defining els to set/return
        var els;
        var firstEl = selector[0];
        var hasId = /(#)/i.test(selector);
        var hasClass = /(\.)/i.test(selector);

        // Contains Spaces (More complicated selector query)
        if(/( )/i.test(selector)) {

            // Return a querySelector
            els = _dom.querySelectorAll(selector);

        // Does not contain spaces. Might qualify for the fast _dom.getElement method
        } else {

            // Check if the selector contains combined selectors
            // Example: #id-of-element.class-of-element

            // Test for #id.class-name
            // If string contains "#" or "."
            if(hasId && hasClass) {
                // Return a querySelector
                els = _dom.querySelectorAll(selector);
            }
            // Test for tagName
            // If string doesn't start with # or .
            else if(firstEl !== '#' || firstEl !== '.') {
                // But, if string contains # or .
                if(hasId || hasClass) {
                    // Return a querySelector
                    els = _dom.querySelectorAll(selector);
                } else {
                    els = _dom.getElementsByTagName(selector);
                }
            }
            // Otherwise, good to go with _dom.getElement(s)By method
            else {
                // Get by ID (#)
                if(hasId) {
                    selector = selector.replace("#", "");
                    els = _dom.getElementById(selector);
                }

                // Get by ClassName
                else if(hasClass) {
                    selector = selector.replace(".", "");
                    els = _dom.getElementsByClassName(selector);
                }

                // Get by TagName
                else {

                    els = _dom.getElementsByTagName(selector);
                }
            }

        }

        // Returning the els
        return this._toArray.call(els);
    };

    /**
     * _parseTo
     * Parsing an item to something else
     *
     * @public
     * @category util
     *
     * @param { string } [ item ] Item/subject to convert
     * @param { string } [ type ] Type of item to convert to
     * @returns { object } Returns whatever is specified by the type @param
     * @perf: Switch vs if-else - http://jsperf.com/switch-if-else/33
     */
    Zest.prototype._parseTo = function(item, type) {
        // Return false if item or type is not defined
        if(!item || !type || typeof type !== "string") {
            return false;
        }

        // Converting type to lowercase
        type = type.toLowerCase();

        // Defining the output
        var output;

        // If type is "array"
        if(type === "array") {
            // split the item by " " (spaces) and redefine output with array
            output = item.split(" ");
        }
        // Default
        else {
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
     * _toArray
     * @Private method to convert a nodeList into an array
     *
     * @private
     *
     * @return { array } Returns an array (converted from a nodeList)
     */
    Zest.prototype._toArray = function() {
        // Defining the array to push to
        var array = [];
        // Defining the loop variables
        var i = -1;
        var len = this.length;
        // Loop through the elements
        while( ++i < len ) {
            // Pushing the element to the array
            array.push(this[i]);
        }
        // Returning the array
        return array;
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
        // Return the first item in the ._el array
        return this._el[0];
    };

    /**
     * firstEl
     * Returns the first element from the _el nodeList
     *
     * @public
     *
     * @return { DOM element }
     */
    Zest.prototype.firstEl = function() {
        // Return the first item in the ._el array
        return this.el();
    };

    /**
     * lastEl
     * Returns the last element from the _el nodeList
     *
     * @public
     *
     * @return { DOM element }
     */
    Zest.prototype.lastEl = function() {
        // Return the last item in the ._el array
        return this._el[this.length - 1];
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
        // Return the full ._el array
        return this._el;
    };

    /**
     * append
     * Method to append/add elements to the element(s) in _e;
     *
     * @public
     *
     * @param { DOM element } [ element ] DOM element(s) to inject
     * @return { nodeList }
     */
    Zest.prototype.append = function(element) {
        // Return Zest if element is not defined or valid
        if(!element || typeof element !== 'object') {
            return this;
        }

        // Looping through all the els
        this.each(function() {
            // Clone the element (Necessary for injection multiple)
            var child = element.cloneNode(true);
            // Append the new child element to the parent (el)
            this.appendChild(child);
        });

        // Returning Zest
        return this;
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
        if(/( )/.test(className)) {
            // redefine className with the parse [array] version
            className = this._parseTo(className, "array");
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
        if(/( )/i.test(className)) {
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

    /**
     * clone
     * Cloning the Zest object and returning a new one
     *
     * @public
     *
     * @return { object } Returns a cloned Zest object
     */
    Zest.prototype.clone = function() {
        // Defining the cloned Zest object
        var clone = _z(this._el);
        // Cloning the selector
        clone.selector = this.selector;

        // Returning the new cloned object
        return clone;
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
     * @perf: array concat - http://jsperf.com/array-concat-vs-push-2/16
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
            var nodes = this._parseSelector(args[i]);
            // Loop through the nodeList
            for(var index = 0, nodeLength = nodes.length; index < nodeLength; index++) {
                // Adding the node to the combined array
                combined.push(nodes[index]);
            }
        }

        // Updating Zest's _el with original elements concated with new combined node elements
        this._el = this._el.concat(combined);
        // Updating Zest's length (count)
        this.length = this._el.length;

        // Returning Zest
        return this;
    };

    /**
     * contains
     * Returns a boolean on whether or not the el contains a selector
     *
     * @public
     *
     * @param { string } [ selector ] Selector to check for
     * @returns { boolean } Returns true/false depending on whether or not the selector exists within el
     */
    Zest.prototype.contains = function(selector) {
        // Return false if item or type is not defined
        if(!selector || typeof selector !== "string") {
            return false;
        }

        // Defining the status
        var status = false;

        // Check the el for the selector
        if(this.firstEl().querySelector(selector)) {
            // if true, update the status
            status = true;
        }

        // Returning the status
        return status;
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
     * filter
     * Looping through each element and returning a filtered Zest object
     *
     * @public
     *
     * @param  { function } [ callback ] The callback function
     * @returns { object } Returns a filtered Zest object class
     */
    Zest.prototype.filter = function(callback) {
        // Return Zest if callback is invalid
        if(!callback || typeof callback !== 'function') {
            return this;
        }

        // Defining a results array to contain the filtered results
        var result = [];
        // Defining variables for loop
        var i = -1;
        var len = this.length;
        // Loop through the elements
        while( ++i < len ) {
            // Defining the value from the _el collection
            var value = this._el[i];
            // If the callback returns something
            if(callback(value, i, this._el)) {
                // Push the value (element) into the results array
                result.push(value);
            }
        }

        // Update the _el with the results array
        this._el = result;
        // Update the length of the Zest object
        this.length = this._el.length;

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

        // Defining the parent Selector
        var parentSelector = this.selector;

        // Create an empty array for findings
        var findings = [];

        // Looping through each of the elements
        this.forEach(function(el) {
            // Finding the children elements of the element
            var children = this._parseSelector(selectors, el);
            // Looping through all the children
            var i = -1;
            var length = children.length;
            while( ++i < length ) {
                // Adding them to the findings array
                findings.push(children[i]);
            }
        });

        // Defining the results with a new Zest object containing the findings
        var results = _z(findings);
        // Updating the results.selector
        if(parentSelector) {
            results.selector = parentSelector + " " + selectors;
        } else {
            results.selector = selectors;
        }

        // Return a new Zest() with the original selectors + find selectors
        return results;
    };

    /**
     * first
     * Returning the first element in _el is a Zest object
     *
     * @public
     *
     * @returns { object } Returns a new Zest object of the first El in _el
     */
    Zest.prototype.first = function() {
        // Creating a new Zest object with the first Node
        var first = _z(this._el[0]);
        // Passing the selector to the first.Selector
        first.selector = this.selector;

        // Returning the new first Zest object
        return first;
    };

    /**
     * last
     * Returning the last element in _el is a Zest object
     *
     * @public
     *
     * @returns { object } Returns a new Zest object of the last El in _el
     */
    Zest.prototype.last = function() {
        // Creating a new Zest object with the last Node
        var last = _z(this._el[this.length - 1]);
        // Passing the selector to the last.Selector
        last.selector = this.selector;

        // Returning the new last Zest object
        return last;
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
            this.innerHTML();
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
     * innerHTML
     * Returning the innerHTML of the first element
     *
     * @public
     *
     * @returns { string } Returns the innerHTML of the first El
     */
    Zest.prototype.innerHTML = function() {
        // Return the innerHTML if the context is not defined
        return this.firstEl().innerHTML;
    };

    /**
     * outerHTML
     * Returning the outerHTML of the first element
     *
     * @public
     *
     * @returns { string } Returns the outerHTML of the first El
     */
    Zest.prototype.outerHTML = function() {
        // Return the outerHTML if the context is not defined
        return this.firstEl().outerHTML;
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

        // Returning true/false if element is visible
        return this._visible();
    };

    /**
     * parent
     * Returning the parent node element from the first Element in _el
     *
     * @public
     *
     * @returns { DOM element } Returns the parent DOM element of the first element
     */
    Zest.prototype.parent = function() {
        // Returning the parents array
        return this._el[0].parentNode;
    };

    /**
     * parents
     * Returning the parent node element from the Element(s)
     *
     * @public
     *
     * @returns { array } Returns an array of parent DOM elements
     */
    Zest.prototype.parents = function() {
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
     * @perf: while loop with shift method - http://jsperf.com/array-destroy/32
     */
    Zest.prototype.remove = function() {
        // Looping through the element(s)
        this.forEach(function(el, i){
            // Remove all events from the Zest object
            this.removeAllEvents();
            // Removing the el from the DOM
            el.parentNode.removeChild(el);
        });

        // Removing the elements from the _el array
        while (this._el.length > 0) {
            this._el.shift();
        }
        // Updating the length
        this.length = 0;

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
        window.Zest = Zest;
    }

    return _z;

})();