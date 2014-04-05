(function (undefined) { "use strict";

    // _z: Zest's namespace
    var _z = function(selectors) {
        // Creates and returns a new Zest object
        return new Zest(selectors);
    };

    // Zest class constructor
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

    // Util: Construction method for the Zest object
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

    // Util: Parsing selector to see if we can use getElementsBy methods instead of querySelector (performance)
    Zest.prototype.parseSelector = function(selector) {
        // Return if the selector is not defined
        if(!selector) {
            return false;
        }

        // Defining els to set/return
        var els;

        // Contains Spaces (More complicated selector query)
        if(selector.indexOf(" ") !== -1) {

            // Return a querySelector
            els = document.querySelectorAll(selector);

        // Does not contain spaces. Might qualify for the fast document.getElement method
        } else {

            // Check if the selector contains combined selectors
            // Example: #id-of-element.class-of-element

            // Test for #id.class-name
            // If string contains "#" or "."
            if(selector.indexOf("#") !== -1 && selector.indexOf(".") !== -1) {
                // Return a querySelector
                els = document.querySelectorAll(selector);
            }
            // Test for tagName
            // If string doesn't start with # or .
            else if(selector[0].indexOf("#") !== -1 || selector[0].indexOf(".") !== -1) {
                // But, if string contains # or .
                if(selector.indexOf("#") !== -1 || selector.indexOf(".") !== -1) {
                    // Return a querySelector
                    els = document.querySelectorAll(selector);
                }
            }
            // Otherwise, good to go with document.getElement(s)By method
            else {
                // Get by ID (#)
                if(selector.indexOf("#") !== -1) {
                    selector = selector.replace("#", "");
                    els = document.getElementById(selector);
                }

                // Get by ClassName
                else if(selector.indexOf(".") !== -1) {
                    selector = selector.replace(".", "");
                    els = document.getElementsByClassName(selector);
                }

                // Get by TagName
                else {
                    els = document.getElementsByTagName(selector);
                }
            }

        }

        // Returning the els
        return els;

    };

    // Util: Parsing an item to something else
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

    // Private: Method to add classes to elements
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


    // Private: Method to add classes to elements
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




    // Public: Returning the first node from the nodeList of dom elements
    Zest.prototype.el = function() {
        return this._el[0];
    };

    // Public: Returning the nodeList of dom elements
    Zest.prototype.els = function() {
        return this._el;
    };

    // Public: Returning the _el nodeList as an array
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

    // Public: Alias of .asArray()
    Zest.prototype.array = function() {
        return this.asArray();
    };




    // Public: Adding classes to elements
    // Params: {
    //     className: name of class(es) to add
    // }
    Zest.prototype.addClass = function(className) {
        // Return Zest if className is not defined
        if(!className) {
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

    // Public: Adding classes to elements
    // Params: {
    //     className: name of class(es) to remove
    // }
    Zest.prototype.removeClass = function(className) {

        // Return Zest if className is not defined
        if(!className) {
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

    // Public: Getting the bounding client rect object
    Zest.prototype.clientRect = function() {
        // Returning the getBoundginClientRect object of the first _el
        return this._el[0].getBoundingClientRect();
    };

    // Public: Combining multiple nodeLists together
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
            var nodes = document.querySelectorAll(args[i]);
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

    // Public: Looping through each element, where "this" represents the element within the callback function
    // Params: {
    //     alias(name of the item in each loop),
    //     callback: callback function
    // }
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

    // Public: Looping through each element
    // Params: {
    //     alias(name of the item in each loop),
    //     callback: callback function
    // }
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




    // Public: Adding events to the element(s)
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

    // Public: Removing events to the element(s)
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

    // Public: Remove all the events
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


    // Public: Emptying the DOM element(s) contents
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


    // Public: Finding elements within the origin element(s)
    Zest.prototype.find = function(selectors) {
        // Return Zest if selectors is not defined
        if(!selectors) {
            return this;
        }

        // Return a new Zest() with the original selectors + find selectors
        return _z(this.selectors + ' ' + selectors);

    };


    // Public: Replacing the innerHTML of the element(s)
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


    // Public: Returns boolean (true/false) if the first dom element is visible in the viewport
    Zest.prototype.inViewport = function() {

        // Definining the Viewport and element coordinates
        var html = document.documentElement;
        var coordinates = this.clientRect();

        // Returning true/false if element is visible
        return (!!coordinates && coordinates.bottom > 0 && coordinates.right > 0 && coordinates.top < html.clientHeight && coordinates.left < html.clientWidth);

    };


    // Public: Returning the parent node element from the Element(s)
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

    // Public: Removing the element(s) from the DOM
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


    // Public: Getting attributes for the first element
    Zest.prototype.getAttribute = function(attribute) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== 'string')
        {
            return this;
        }

        // Returning the attribute
        return this._el[0].getAttribute(attribute);

    };

    // Public: Setting attributes for the element(s)
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

    // Public: Removing attributes for the element(s)
    Zest.prototype.removeAttribute = function(attribute, data) {
        // Return Zest if attributes / data is not valid / defined
        if( !attribute || typeof attribute !== 'string' ||
            !data || typeof data !== 'string')
        {
            return this;
        }

        // Looping through all the els
        this.forEach(function(el) {
            el.removeAttribute(attribute, data);
        });

        // Return Zest
        return this;

    };



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

// window.a = _z('article');
// a.addClass('okay not-okay bbbb');
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