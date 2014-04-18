/**
 * @license
 * Zest 0.0.1
 * Copyright 2014 Jon Q
 * https://github.com/ItsJonQ/Zest
 * Available underMIT license
 */

(function (window, document, undefined) { "use strict";

    /**
     * @constants
     */
    var _window = window;
    var _document = document;
    /**
     * @source jQuery
     * @type { RegExp }
     */
    var _selectorRegex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

    /**
     * -------------
     * ZEST
     * -------------
     *
     * Create a new "Zest" class
     *
     * @category class
     *
     * @namespace Z$
     *
     * @param { string } [ selector ] Selector(s) to be used to retrieve elements with from the DOM
     */
    var Z$ = function(selector) {
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
        this._create(selector);

        // Returning the Zest object
        return this;
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

        // Defining self for use in classList fn
        var self = this;
        // Creating fn to prevent support for IE9
        var fn;
        // If this element contains .classList (modern browsers)
        if (this.classList) {
            // Use the .classList.add() method
            fn = function(c) {
                self.classList.add(c);
            };
        } else {
            // Use the classList concat method
            fn = function(c) {
                self.className += ' ' + c;
            };
        }

        // If classes are an array (multiple classes)
        if(className instanceof Array) {
            // Loop through the classNames
            for(var i = 0, len = className.length; i < len; i++) {
                // Add the classNames to "this" (el)
                fn(className[i]);
            }
        } else {
            // Add the individual className to "this" (el)
            fn(className);
        }

        // Return "this" (el)
        return this;
    };

    /**
     * _create
     *
     * @private
     * @category util
     *
     * @param { string } [ selector ] Selector to retrieve from the DOM
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype._create = function(selector) {
        // Return false if selector is not defined
        if(!selector) {
            return false;
        }

        // Defining the events of the Zest object
        this._events = {};
        // Defining the memoized info of the Zest object
        this._memo = {};
        // Defining listeners for the Zest object
        this._listeners = {};

        // Defining Zest's _el (elements)
        if(typeof selector === "string") {
            // Construct the Zest object with the defined selector
            this._el = this._parseSelector(selector);
            this.length = this._el.length;
            return this;
        }
        // Check to see if the selector is an instance of Zest
        if(selector instanceof Zest) {
            // Get the els from the Zest object
            this._el = [selector.els()];
            this.length = this._el.length;
            return this;
        }
        // Check to see if the selector is an array of DOM elements
        if(selector instanceof Array) {
            // Defining the els array
            var els = [];
            // Defining variables for loop
            var i = 0;
            var len = selector.length;
            // Loop through the elements
            for( ; i < len; i++) {
                // If the selector is a node object
                if(selector[i].nodeType === 1) {
                    // Push it to the _el array
                    els.push(selector[i]);
                }
            }
            this._el = els;
            this.length = this._el.length;
            return this;
        }
        // Check to see if the selector is an individual element
        if( selector instanceof HTMLElement || selector instanceof Node) {
            this._el = [selector];
            this.length = this._el.length;
            return this;
        }
        // Check to see if the selector is an HTML collection
        if(selector instanceof HTMLCollection) {
            this._el = this._toArray.call(selector);
            this.length = this._el.length;
            return this;
        }

        // Returning the Zest object
        return this;
    };

    /**
     * _delegateEvent
     *
     * @private
     *
     * This method helps delegate event callbacks for Zest.prototype.on. It initializes the callback if the event.target matches the selector
     * @param  { event }        e           [ the event]
     * @param  { string / DOM } selector    [ the selector to delegate event to ]
     * @param  { function }     callback    [ the callback method ]
     * @return { function }                 [ returns the callback method if valid]
     */
    Zest.prototype._delegateEvent = function(e, selector, callback) {
        var self = this;
        // Return if event or callback is invalid
        if(!e || !selector || !callback || typeof callback !== "function") {
            return self;
        }

        // Defining the target
        var target = self._getEventTarget(e);
        // Initialize the callback if the target matches the selector
        if(self._getMatcher(target).call(target, selector)) {
            // Return the callback, passing the event
            callback(e);
        } else {
            // Return false
            return false;
        }

    };

    /**
     * _getEventTarget
     * Returns the event target. Uses srcElement as a fallback for IE
     *
     * @private
     *
     * @param  { event } e [ the event ]
     * @return { DOM object }   [ the target]
     */
    Zest.prototype._getEventTarget = function(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    };

    /**
     * _getMatcher
     * Returns a element.matches method
     *
     * @private
     *
     * @param  { DOM element } element  [ DOM node element ]
     * @return { method }               [ Return appropriate match method]
     *
     * @source: https://github.com/ccampbell/gator/blob/master/gator.js
     */
    Zest.prototype._getMatcher = function(element) {
        var _matcher;

        if (element.matches) {
            _matcher = element.matches;
        }

        if (element.webkitMatchesSelector) {
            _matcher = element.webkitMatchesSelector;
        }

        if (element.mozMatchesSelector) {
            _matcher = element.mozMatchesSelector;
        }

        if (element.msMatchesSelector) {
            _matcher = element.msMatchesSelector;
        }

        if (element.oMatchesSelector) {
            _matcher = element.oMatchesSelector;
        }

        return _matcher;
    };

    /**
     * _onChange
     * Fires whenever a bounded method is triggered
     *
     * @private
     *
     * @param  { string } [method] The name of the method
     * @return { object } Returns the Zest object
     */
    Zest.prototype._onChange = function(method) {
        // Defining the method and the length
        var fn = this._listeners[method];
        // Return the object if the method is not defined
        if(!fn) {
            return this;
        }
        var length = fn.length;
        // If both are valid, loop through the _listers[method]
        if(length) {
            for(var i = 0; i < length; i++) {
                // Initiate the callback
                fn[i]();
            }
        }

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
     * @param { string } [ context ] Context node element to search
     * @returns { array } Returns an empty array
     *
     * @note Avoided using if/else for performance
     */
    Zest.prototype._parseSelector = function(selector, context) {
        // Defining the _dom object to grab the element(s) from
        var _dom = context ? context : _document;
        // Regex'ing the selector to catch for match type
        var match = _selectorRegex.exec( selector );

        // NO MATCH - Complex Selector
        if ( !match ) {
            return this._toArray.call(_dom.querySelectorAll(selector));
        }
        // "#" MATCH - ID Selector
        if( match[1] ) {
            return [_dom.getElementById(match[1])];
        }
        // "" MATCH - Tag Selector
        if( match[2] ) {
            return this._toArray.call(_dom.getElementsByTagName(selector));
        }
        // "." MATCH - Class Selector
        if( match[3] ) {
            return this._toArray.call(_dom.getElementsByClassName(match[3]));
        }
        // Else, return an empty object
        return [];
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
     * _removeClass
     * Private method to remove class from a DOM element (this)
     *
     * @private
     *
     * @param { string } [ className ] The class name to be removed from the element
     * @source: http://youmightnotneedjquery.com/
     */
    Zest.prototype._removeClass = function(className) {
        // Return "this" if className is not defined
        if(!className) {
            return this;
        }

        // Defining self to use this in the classList remove fn
        var self = this;
        // Defining the fn used to remove classes (IE9 support)
        var fn;

        // If classList exists (modern browsers)
        if(this.classList) {
            // Use classList.remove() method
            fn = function(c) {
                self.classList.remove(c);
            };
        } else {
            // Use replace/regex method
            fn = function(c) {
                self.className = self.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            };
        }

        // If classes are an array (multiple classes)
        if(className instanceof Array) {
            // Loop through the classNames
            for(var i = 0, len = className.length; i < len; i++) {
                // Add the classNames to "this" (el)
                fn(className[i]);
            }
        } else {
            // Add the individual className to "this" (el)
            fn(className);
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
        // Defining variables for loop
        var i = 0;
        var len = this.length;
        // Loop through the elements
        for( ; i < len; i++) {
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

        var htmlDoc = _document.documentElement;
        var coords = this.clientRect();

        // Returning true/false if element is visible
        return (!!coords && coords.bottom > 0 && coords.right > 0 && coords.top < htmlDoc.clientHeight && coords.left < htmlDoc.clientWidth);
    };


    /**
     * ------------
     *
     * Public Methods
     *
     * ------------
     *
     * Chainable Methods
     * These methods return either the same Zest object, or a new Zest
     * object (depending on the method)
     *
     * 'addClass', 'addEvent', 'after', 'append', 'before', 'child',
     * 'children', 'clone', 'combine', 'each', 'empty', 'filter', 'find',
     * 'first', 'hide', 'last', 'listen', 'on', parent', 'parents', 'prepend',
     * 'remove', 'removeAllEvents', 'removeAttribute', 'removeClass',
     * 'removeEvent', 'show', 'siblings', 'stopListening', 'style', 'toggle',
     * 'toggleClass', 'trigger'
     *
     * ------------
     *
     * Non-Chainable Methods
     * These methods typically return booleans or data (in the form of strings,
     * objects, arrays, etc...). Some non-chainable methods perform actions
     * within the DOM.
     *
     * 'clientRect', 'contains', el', 'els', 'firstEl', 'getAttribute',
     * 'innerHTML', 'inViewport', 'is', 'hasClass', 'html', 'lastEl',
     * 'matches', 'next', 'nextEl', 'outerHTML', 'parentEl', 'parentsEl',
     * 'previous', 'previousEl', 'setAttribute', 'scrollIntoView', 'text'
     *
     * ------------
     *
     * Listenable Methods
     * These methods execute the _onChange() method, which fire callbacks if
     * bounded to the method
     *
     * 'addClass', 'append', 'after', 'before', 'clone', 'combine', 'empty',
     * 'filter', 'hide', 'prepend', remove', 'removeAllEvents',
     * 'removeAttribute', 'removeClass', 'removeEvent', 'setAttribute',
     * 'show', 'toggle', 'toggleClass'
     *
     */

    /**
     * addClass
     * Adding a class (or multiple classes) to the element(s) in _el
     *
     * @public
     * @listenable
     *
     * @param { string } [ className ] The class to be added to the element(s)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.addClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== "string") {
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

        // Fire on change
        this._onChange('addClass');

        // Returning Zest
        return this;
    };

    /**
     * addEvent
     * Adding events to the element(s)
     *
     * @public
     * @listenable
     *
     * @param  { event } [ event ] The name of the event (eg. 'click', 'mouseenter', etc..)
     * @param  { string } [ handler ] The callback function for the event
     * @param  { boolean } [ capture ] The capture status (true or false)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.addEvent = function(event, handler, capture) {
        // Return Zest if event or handler is invalid
        if( !event || typeof event !== "string" ||
            !handler || typeof handler !== "function")
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
            if(!(event in this._events[el]) || (this._events[el] && this._events[el][event] === undefined)) {
                this._events[el][event] = [];
            }

            // Pusing the event handler and capture to the new "event" within the _events array
            this._events[el][event].push([handler, capture]);

            // Assign the event listener of the "event" to the el
            el.addEventListener(event, handler, capture);

        });

        // Fire on change
        this._onChange('addEvent');

        // Return Zest
        return this;
    };

    /**
     * after
     * Adding HTML after the elements
     *
     * @public
     *
     * @param  { string } [ html ] HTML String to be injected
     * @return { object } Returning the Zest object
     */
    Zest.prototype.after = function(html) {
        // Return the Zest object if html is not valid
        if(!html || typeof html !== "string") {
            return this;
        }

        // Loop through all the elements
        this.each(function() {
            // Insert the html after the end of the element
            this.insertAdjacentHTML('afterend', html);
        });

        // Fire on change
        this._onChange('after');

        // Return Zest
        return this;
    };

    /**
     * append
     * Method to append/add elements to the element(s) in _e;
     *
     * @public
     * @listenable
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

        // Fire on change
        this._onChange('append');

        // Returning Zest
        return this;
    };

    /**
     * before
     * Adding HTML before the elements
     *
     * @public
     *
     * @param  { string } [ html ] HTML String to be injected
     * @return { object } Returning the Zest object
     */
    Zest.prototype.before = function(html) {
        // Return the Zest object if html is not valid
        if(!html || typeof html !== "string") {
            return this;
        }

        // Loop through all the elements
        this.each(function() {
            // Insert the html before the end of the element
            this.insertAdjacentHTML('beforebegin', html);
        });

        // Fire on change
        this._onChange('before');

        // Return Zest
        return this;
    };

    /**
     * child
     * Returns a new Zest object contain the first child of the element
     *
     * @public
     *
     * @return { object } Returns Zest object with a child el
     */
    Zest.prototype.child = function() {
        // Defining the children elements
        var children = this.firstEl().children;
        // If children exist
        if(children) {
            var child = children[0];
            // Get the tag of the first child
            var tag = child.tagName.toLowerCase();
            // Create a new Zest object
            var kid = Z$(child);
            // Update the newly created Zest object
            kid.selector = this.selector + " " + tag;
            // Returning the children elements as a Zest object
            return kid;
        } else {
            // Return the original Zest object
            return this;
        }
    };

    /**
     * children
     * Returns a new Zest object containing all the children elements
     *
     * @public
     *
     * @return { object } Returns Zest object with children els
     */
    Zest.prototype.children = function() {
        // Defining the children elements
        var children = this.firstEl().children;
        // If children exist
        if(children) {
            // Get the tag of the first child
            var tag = children[0].tagName.toLowerCase();
            // Create a new Zest object
            var kids = Z$(children);
            // Update the newly created Zest object
            kids.selector = this.selector + " " + tag;
            // Returning the children elements as a Zest object
            return kids;
        } else {
            // Return the original Zest object
            return this;
        }
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
     * @listenable
     *
     * @return { object } Returns a cloned Zest object
     */
    Zest.prototype.clone = function() {
        // Defining the cloned Zest object
        var clone = Z$(this._el);
        // Cloning the selector
        clone.selector = this.selector;

        // Fire on change
        this._onChange('clone');

        // Returning the new cloned object
        return clone;
    };

    /**
     * combine
     * Combining multiple nodeLists together
     *
     * @public
     * @listenable
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

        // Fire on change
        this._onChange('combine');

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
        if(this._parseSelector(selector, this.firstEl()).length > 0) {
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
        if(!callback || typeof callback !== "function") {
            return this;
        }

        // Defining variables for loop
        var i = 0;
        var len = this.length;
        // Loop through the elements
        for( ; i < len; i++) {
            // Fire the callback
            callback.call(this._el[i], i, this._el[i]);
        }

        // Returning Zest
        return this;
    };

    /**
     * el
     * Returns the first element from the _el nodeList
     *
     * @public
     *
     * @param { number } [ index ] If defined, return the specific el within the _els array
     * @return { DOM element }
     */
    Zest.prototype.el = function(index) {
        // If index is defined and valid
        if(index && typeof index === "number" && index <= this.length - 1) {
            return this._el[index];
        }
        // Return the first item in the ._el array
        return this._el[0];
    };

    /**
     * els
     * Returns the _el nodeList
     *
     * @public
     *
     * @param { number } [ index ] If defined, return the specific el within the _els array
     * @return { nodeList }
     */
    Zest.prototype.els = function(index) {
        // If index is defined and valid
        if(index && typeof index === "number" && index <= this.length - 1) {
            return this._el[index];
        }
        // Return the full ._el array
        return this._el;
    };

    /**
     * empty
     * Empty / remove all the elements from the _el node elements
     *
     * @public
     * @listenable
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

        // Fire on change
        this._onChange('empty');

        // Return Zest
        return this;
    };

    /**
     * filter
     * Looping through each element and returning a filtered Zest object
     *
     * @public
     * @listenable
     *
     * @param  { function } [ callback ] The callback function
     * @returns { object } Returns a filtered Zest object class
     */
    Zest.prototype.filter = function(callback) {
        // Return Zest if callback is invalid
        if(!callback || typeof callback !== "function") {
            return this;
        }

        // Defining a results array to contain the filtered results
        var result = [];
        // Defining variables for loop
        var i = 0;
        var len = this.length;
        // Loop through the elements
        for( ; i < len; i++) {
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

        // Fire on change
        this._onChange('filter');

        // Returning Zest
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
            var i = 0;
            var len = children.length;
            // Loop through the elements
            for( ; i < len; i++) {
                // Adding them to the findings array
                findings.push(children[i]);
            }
        });

        // Defining the results with a new Zest object containing the findings
        var results = Z$(findings);
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
        var first = Z$(this._el[0]);
        // Passing the selector to the first.Selector
        first.selector = this.selector;

        // Returning the new first Zest object
        return first;
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
        if(!callback || typeof callback !== "function") {
            return this;
        }

        // Defining variables for loop
        var i = 0;
        var len = this.length;
        // Loop through the elements
        for( ; i < len; i++) {
            // Fire the callback
            callback.call(this, this._el[i], i);
        }

        // Returning Zest
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
        if( !attribute || typeof attribute !== "string")
        {
            return this;
        }

        // Returning the attribute
        return this._el[0].getAttribute(attribute);
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
     * is
     * Returns boolean (true/false) if the object in question is this object
     *
     * @public
     *
     * @returns { boolean } Returns true/false
     */
    Zest.prototype.is = function(object) {

        // Return false if object is invalid
        if(!object || typeof object !== "object" || !object instanceof Zest) {
            return false;
        }

        // Return boolean comparison between this and the object
        return this === object;
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
        if(!className || typeof className !== "string") {
            return this;
        }

        // Returning hasClass status (true or false)
        return this._el[0].classList.contains(className);
    };

    /**
     * hide
     * Hiding all the elements in the DOM
     *
     * @public
     * @listenable
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.hide = function() {
        // Looping through all the els
        this.each(function() {
            // Setting all the els to display: block
            this.style.display = 'none';
        });

        // Fire on change
        this._onChange('hide');

        // Returning Zest
        return this;
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
     * last
     * Returning the last element in _el is a Zest object
     *
     * @public
     *
     * @returns { object } Returns a new Zest object of the last El in _el
     */
    Zest.prototype.last = function() {
        // Creating a new Zest object with the last Node
        var last = Z$(this._el[this.length - 1]);
        // Passing the selector to the last.Selector
        last.selector = this.selector;

        // Returning the new last Zest object
        return last;
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
     * listen
     * Setting up callbacks to fire when Zest methods are triggered
     *
     * @public
     *
     * @param  { string } [ method ] The name of the method to listen to
     * @param  { callback } [ function ] The callback function to fire when the method is triggered
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.listen = function(method, callback) {
        // Check that method and callback are defined and valid
        if(!method || typeof method !== "string" ||
            !callback || typeof callback !== "function") {
            return this;
        }
        // If this method isn't defined under _listeners
        if(!this._listeners[method] || this._listeners[method] === undefined) {
            // Add this method as an array
            this._listeners[method] = [];
        }
        // Pushing this callback method to the _listeners[method] array
        this._listeners[method].push(callback);

        // Returning the Zest object
        return this;
    };

    /**
     * matches
     * Returns a boolean based on whether a selector matches the first
     * element in the Zest object
     *
     * @public
     *
     * @param  { string } selector [ the selector to check ]
     * @return { boolean }         [ returning true/false depending on whether or not the selector matches]
     */
    Zest.prototype.matches = function(selector) {
        // Return if string is invalid
        if(!selector || typeof selector !== "string") {
            return this;
        }
        // Defining the first element
        var firstEl = this.firstEl();
        // Return the matches result
        return this._getMatcher(firstEl).call(firstEl, selector);
    };

    /**
     * next
     * Returning the next sibling element as a new Zest object
     *
     * @public
     *
     * @returns { object } Returns a new Zest object class
     */
    Zest.prototype.next = function() {
        // Getting the next sibling
        var nextSibling = this.nextEl();
        // If the sibling exists
        if(nextSibling) {
            // Create a new Zest object of the next sibling
            var sib = Z$(nextSibling);
            // Updating the selector
            sib.selector = this.selector;
            // Return the new Zest object of the sibling
            return sib;
        } else {
            // Return current Zest object
            return this;
        }
    };

    /**
     * next
     * Returning the next sibling element
     *
     * @public
     *
     * @returns { DOM element } Returns the sibling DOM element
     */
    Zest.prototype.nextEl = function() {
        // Return element using .nextElementSibling
        return this.firstEl().nextElementSibling;
    };


    /**
     * on
     * Assigns / delegates events to the element(s)
     * TODO: Will definintely need to see if there's a way to refine this.
     * But, for the most part, it's working as expected :).
     *
     * @param  { string }   events   [ The event name]
     * @param  { string }   selector [ The selector to delegate the event to (or the callback) ]
     * @param  { function } callback [ The callback method for the event ]
     * @return { object }            [ Returns the Zest object]
     */
    Zest.prototype.on = function(events, selector, callback) {
        var self = this;

        // Return if events or selector is not defined
        if(!events || !selector) {
            return self;
        }

        // Put events in array if not in array
        if(!(events instanceof Array)) {
            events = [events];
        }

        // Defining the eventFn to pass to addEvent
        var eventFn;

        // Set the callback if the selector is a function (aka. callback)
        if(typeof selector === "function" && !callback) {
            eventFn = selector;
            // Reassign the selector as the document
            selector = _document;
        } else {
            eventFn = function(e) {
                // Delegate the event
                return self._delegateEvent(e, selector, callback);
            };
        }

        // Looping through all the events
        var i = 0;
        var len = events.length;
        for( ; i < len; i++ ) {
            // Adding the event
            self.addEvent(events[i], eventFn);
        }

        // Returning the Zest object
        return self;
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
     * parentEl
     * Returning the parent node of the first Element as a new Zest object
     *
     * @public
     *
     * @returns { object } Returning the parent node elements as a new Zest object
     */
    Zest.prototype.parent = function() {
        // Returning the new Zest object with parent Nodes
        return Z$(this.parentEl());
    };

    /**
     * parents
     * Returning the parent node elements of all elements as a new Zest object
     *
     * @public
     *
     * @returns { object } Returning the parent node elements as a new Zest object
     */
    Zest.prototype.parents = function() {
        // Returning the new Zest object with parent Nodes
        return Z$(this.parentsEl());
    };

    /**
     * parentEl
     * Returning the parent node element from the first Element in _el
     *
     * @public
     *
     * @returns { DOM element } Returns the parent DOM element of the first element
     */
    Zest.prototype.parentEl = function() {
        // Returning the parents array
        return this.firstEl().parentNode;
    };

    /**
     * parentsEl
     * Returning the parent node element from the Element(s)
     *
     * @public
     *
     * @returns { array } Returns an array of parent DOM elements
     */
    Zest.prototype.parentsEl = function() {
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
     * prepend
     * Method to prepend/add elements to the element(s) in _e;
     *
     * @public
     * @listenable
     *
     * @param { DOM element } [ element ] DOM element(s) to inject
     * @return { nodeList }
     */
    Zest.prototype.prepend = function(element) {
        // Return Zest if element is not defined or valid
        if(!element || typeof element !== 'object') {
            return this;
        }

        // Looping through all the els
        this.each(function() {
            // Clone the element (Necessary for injection multiple)
            var child = element.cloneNode(true);
            // prepend the new child element to the parent (el)
            this.insertBefore(child, this.firstChild);
        });

        // Fire on change
        this._onChange('prepend');

        // Returning Zest
        return this;
    };

    /**
     * previous
     * Returning the previous sibling element as a new Zest object
     *
     * @public
     *
     * @returns { object } Returns a new Zest object class
     */
    Zest.prototype.previous = function() {
        // Getting the previous sibling
        var previousSibling = this.previousEl();
        // If the sibling exists
        if(previousSibling) {
            // Create a new Zest object of the previous sibling
            var sib = Z$(previousSibling);
            // Updating the selector
            sib.selector = this.selector;
            // Return the new Zest object of the sibling
            return sib;
        } else {
            // Return current Zest object
            return this;
        }
    };

    /**
     * previous
     * Returning the previous sibling element
     *
     * @public
     *
     * @returns { DOM element } Returns the sibling DOM element
     */
    Zest.prototype.previousEl = function() {
        // Return element using .previousElementSibling
        return this.firstEl().previousElementSibling;
    };

    /**
     * remove
     * Removing the element(s) from the DOM
     *
     * @public
     * @listenable
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

        // Fire on change
        this._onChange('remove');

        // Return Zest
        return this;
    };

    /**
     * removeAllEvent
     * Removing all the events from the element(s)
     *
     * @public
     * @listenable
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

        // Fire on change
        this._onChange('removeAllEvents');

        // Return Zest
        return this;
    };

    /**
     * removeAttribute
     * Removing attributes for the element(s)
     *
     * @public
     * @listenable
     *
     * @param { string } [ attribute ] The name of the attribute to target
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeAttribute = function(attribute) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== "string") {
            return this;
        }

        // Looping through all the els
        this.forEach(function(el) {
            el.removeAttribute(attribute);
        });

        // Fire on change
        this._onChange('removeAttribute');

        // Return Zest
        return this;
    };

    /**
     * removeClass
     * Removing a class (or multiple classes) to the element(s) in _el
     *
     * @public
     * @listenable
     *
     * @param { string } [ className ] The class to be removed to the element(s)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== "string") {
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

        // Fire on change
        this._onChange('removeClass');

        // Returning Zest
        return this;
    };

    /**
     * removeEvent
     * Removing events from the element(s)
     *
     * @public
     * @listenable
     *
     * @param  { event } [ event ] The name of the event (eg. 'click', 'mouseenter', etc..)
     * @param  { string } [ handler ] The callback function for the event
     * @param  { boolean } [ capture ] The capture status (true or false)
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.removeEvent = function(event, handler, capture) {
        // Return Zest if event or handler is invalid
        if(!event || typeof event !== "string") {
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
                        self._events[el][event] = undefined;
                    }, 16);
                }
            }

        });

        // Fire on change
        this._onChange('removeEvent');

        // Return Zest
        return this;
    };

    /**
     * setAttribute
     * Setting attributes for the element(s)
     *
     * @public
     * @listenable
     *
     * @param { string } [ attribute ] The name of the attribute to target
     * @param { string } [ data ] The data to be set / updated
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.setAttribute = function(attribute, data) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== "string" ||
            !data || typeof data !== "string")
        {
            return this;
        }

        // Looping through all the els
        this.forEach(function(el) {
            el.setAttribute(attribute, data);
        });

        // Fire on change
        this._onChange('setAttribute');

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
     * siblings
     * Returning the siblings of the current El as a new Zest object (if applicable)
     *
     * @public
     * @return { object } New Zest object with siblings / Current Zest object
     * @source: http://youmightnotneedjquery.com/
     */
    Zest.prototype.siblings = function() {
        // Defining the first el
        var el = this.firstEl();
        // Getting the siblings
        var siblings = Array.prototype.filter.call(el.parentNode.children, function(child) {
            // Return if the child is not el
            return child !== el;
        });

        // If siblings exist
        if(siblings.length) {
            // Transfer the selector to new siblings object
            var sibs = Z$(siblings);
            sibs.selector = this.selector;
            // Return siblings as a new Zest object
            return sibs;
        }
        // Else, return this Zest object
        return this;
    };

    /**
     * show
     * Showing all the elements in the DOM
     *
     * @public
     * @listenable
     *
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.show = function() {
        // Looping through all the els
        this.each(function() {
            // Setting all the els to display: inherit
            this.style.display = '';
        });

        // Fire on change
        this._onChange('show');

        // Returning Zest
        return this;
    };

    /**
     * stopListening
     * Removing the callbacks of the methods bounded to the Zest via .listen()
     *
     * @public
     *
     * @param  { string } [ method ] The name of the method to stop listening to
     * @return { object } Returning the Zest object
     */
    Zest.prototype.stopListening = function(method) {
        // Check that method and callback are defined and valid
        if(!method || typeof method !== "string") {
            return this;
        }

        // Defining the method
        var fn = this._listeners[method];

        // If the _listeners contains the method
        if(fn || fn !== undefined) {
            // Empty the array (of callback)
            fn.length = 0;
            // Delete the method from the _listeners object
            this._listeners[method] = undefined;
        }

        // Returning the Zest object
        return this;
    };

    /**
     * stopListeningAll
     * Removing all the callbacks of the methods bounded to the Zest via .listen()
     *
     * @public
     *
     * @return { object } Returning the Zest object
     */
    Zest.prototype.stopListeningAll = function() {

        // Loop through all the listeners
        for(var fn in this._listeners) {
            // Set the listener method to undefined
            this._listeners[fn] = undefined;
        }

        // Returning the Zest object
        return this;
    };

    /**
     * style
     * Setting the style of the elements
     *
     * @public
     *
     * @param { string } [ style ] The style that needs to be updated
     * @param { value } [ value ] The value to update with
     * @return { object } Returning the Zest object
     */
    Zest.prototype.style = function(style, value) {
        // Return the object if style or value is invalid
        if(!style || typeof style !== "string" || !value) {
            return this;
        }

        // If the style is a valid style
        if(this.el().style[style] !== undefined) {
            // Loop through all the elements
            this.each(function() {
                // Apply the style
                this.style[style] = value;
            });
        }

        // Return the Zest object
        return this;
    };

    /**
     * text
     * Getting the text content of the first element
     *
     * @public
     *
     * @param { string } [ replacement ] Replacement text
     * @returns { string } Returns the text content (or the Zest object if
     * replacement is defined)
     */
    Zest.prototype.text = function(replacement) {
        if(replacement && typeof replacement === "string") {
            this.firstEl().textContent = replacement;
            // Return the Zest object
            return this;
        } else {
            // Returning the textContent
            return this.firstEl().textContent;
        }
    };

    /**
     * Toggle
     * Toggling the visibility of the elements in the DOM
     *
     * @public
     * @listenable
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
                // Fire on change
                this._onChange('hide');
            } else {
                // Setting the element as display: inherit
                el.style.display = '';
                // Fire on change
                this._onChange('show');
            }
        });
        // Returning Zest
        return this;
    };

    /**
     * toggleClass
     * Toggling a class for the element(s) in _el
     *
     * @public
     * @listenable
     *
     * @param { string } [ className ] The class to be toggled
     * @returns { object } Returns the Zest object class
     */
    Zest.prototype.toggleClass = function(className) {
        // Return Zest if className is not defined
        if(!className || typeof className !== "string") {
            return this;
        }

        // Looping through all the els
        this.each(function() {
            // If the el has the class of className
            if(this.classList.contains(className)) {
                // remove the class
                this.classList.remove(className);
                // Fire on change
                this._onChange('removeClass');
            } else {
                // add the class
                this.classList.add(className);
                // Fire on change
                this._onChange('addClass');
            }
        });

        // Returning Zest
        return this;
    };

    /**
     * tojQuery
     * Transforms the Zest object to a jQuery object
     *
     * @public
     *
     * @return { object } Returns a jQuery object
     */
    Zest.prototype.tojQuery = function() {
        // Check to see if jQuery exists in the window
        if(window.jQuery || typeof jQuery === "function") {
            return $(this.els());
        }
    };

    /**
     * to$
     * Transforms the Zest object to a jQuery object
     *
     * @alias of tojQuery
     *
     * @public
     *
     * @return { object } Returns a jQuery object
     */
    Zest.prototype.to$ = function() {
        return this.tojQuery();
    };

    /**
     * trigger
     * Triggering HTML events from the elements
     *
     * @public
     *
     * @param { string } [ evt ] HTML event to trigger
     * @return { object } Returns the Zest obkect
     *
     * @note Does NOT detect whether or not event is supported.
     * The below method has not been implemented
     * http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
     *
     */
    Zest.prototype.trigger = function(evt) {
        // Return the Zest object if the event is not valid
        if(!evt || typeof evt !== "string") {
            return this;
        }
        // Creating the event
        var event = document.createEvent('HTMLEvents');
        // Initializing the event
        event.initEvent(evt, true, false);
        // Looping through the elements
        this.each(function() {
            // Dispatching the event
            this.dispatchEvent(event);
        });
        // Returning the Zest object
        return this;
    };


    /**
     * Global
     * Adding Zest to the global window
     */

    // Adding Zest's Z$ namespace to global window
    if(!window.Z$) {
        window.Z$ = Z$;
    }

    // Adding Zest to global window
    if(!window.Zest) {
        window.Zest = Zest;
    }

    return Z$;

})(this, document);