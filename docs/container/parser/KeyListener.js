/*
Copyright (c) 2006, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
Version 0.12
*/

/**
* KeyListener is a utility that provides an easy interface for listening for keydown/keyup events fired against DOM elements.
* @namespace YAHOO.util
* @class KeyListener
* @constructor
* @param {HTMLElement}	attachTo	The element or element ID to which the key event should be attached
* @param {String}	attachTo	The element or element ID to which the key event should be attached
* @param {Object}	keyData		The object literal representing the key(s) to detect. Possible attributes are shift(boolean), alt(boolean), ctrl(boolean) and keys(either an int or an array of ints representing keycodes).
* @param {Function}	handler		The CustomEvent handler to fire when the key event is detected
* @param {Object}	handler		An object literal representing the handler. 
* @param {String}	event		Optional. The event (keydown or keyup) to listen for. Defaults automatically to keydown.
*/
YAHOO.util.KeyListener = function(attachTo, keyData, handler, event) {
	if (! event) {
		event = YAHOO.util.KeyListener.KEYDOWN;
	}

	/**
	* The CustomEvent fired internally when a key is pressed
	* @event keyEvent
	* @private
	* @param {Object}	keyData		The object literal representing the key(s) to detect. Possible attributes are shift(boolean), alt(boolean), ctrl(boolean) and keys(either an int or an array of ints representing keycodes).
	*/
	var keyEvent = new YAHOO.util.CustomEvent("keyPressed");
	
	/**
	* The CustomEvent fired when the KeyListener is enabled via the enable() function
	* @event enabledEvent
	* @param {Object}	keyData		The object literal representing the key(s) to detect. Possible attributes are shift(boolean), alt(boolean), ctrl(boolean) and keys(either an int or an array of ints representing keycodes).
	*/
	this.enabledEvent = new YAHOO.util.CustomEvent("enabled");

	/**
	* The CustomEvent fired when the KeyListener is disabled via the disable() function
	* @event disabledEvent
	* @param {Object}	keyData		The object literal representing the key(s) to detect. Possible attributes are shift(boolean), alt(boolean), ctrl(boolean) and keys(either an int or an array of ints representing keycodes).
	*/
	this.disabledEvent = new YAHOO.util.CustomEvent("disabled");

	if (typeof attachTo == 'string') {
		attachTo = document.getElementById(attachTo);
	}

	if (typeof handler == 'function') {
		keyEvent.subscribe(handler);
	} else {
		keyEvent.subscribe(handler.fn, handler.scope, handler.correctScope);
	}

	/**
	* Handles the key event when a key is pressed.
	* @method handleKeyPress
	* @param {DOMEvent} e	The keypress DOM event
	* @param {Object}	obj	The DOM event scope object
	* @private
	*/
	function handleKeyPress(e, obj) {
		if (! keyData.shift) {	
			keyData.shift = false; 
		}
		if (! keyData.alt) {	
			keyData.alt = false;
		}
		if (! keyData.ctrl) {
			keyData.ctrl = false;
		}

		// check held down modifying keys first
		if (e.shiftKey == keyData.shift && 
			e.altKey   == keyData.alt &&
			e.ctrlKey  == keyData.ctrl) { // if we pass this, all modifiers match
			
			var dataItem;
			var keyPressed;

			if (keyData.keys instanceof Array) {
				for (var i=0;i<keyData.keys.length;i++) {
					dataItem = keyData.keys[i];

					if (dataItem == e.charCode ) {
						keyEvent.fire(e.charCode, e);
						break;
					} else if (dataItem == e.keyCode) {
						keyEvent.fire(e.keyCode, e);
						break;
					}
				}
			} else {
				dataItem = keyData.keys;

				if (dataItem == e.charCode ) {
					keyEvent.fire(e.charCode, e);
				} else if (dataItem == e.keyCode) {
					keyEvent.fire(e.keyCode, e);
				}
			}
		}
	}

	/**
	* Enables the KeyListener by attaching the DOM event listeners to the target DOM element
	* @method enable
	*/
	this.enable = function() {
		if (! this.enabled) {
			YAHOO.util.Event.addListener(attachTo, event, handleKeyPress);
			this.enabledEvent.fire(keyData);
		}
		/**
		* Boolean indicating the enabled/disabled state of the Tooltip
		* @property enabled
		* @type Boolean
		*/
		this.enabled = true;
	};

	/**
	* Disables the KeyListener by removing the DOM event listeners from the target DOM element
	* @method disable
	*/
	this.disable = function() {
		if (this.enabled) {
			YAHOO.util.Event.removeListener(attachTo, event, handleKeyPress);
			this.disabledEvent.fire(keyData);
		}
		this.enabled = false;
	};

	/**
	* Returns a String representation of the object.
	* @method toString
	* @return {String}	The string representation of the KeyListener
	*/ 
	this.toString = function() {
		return "KeyListener [" + keyData.keys + "] " + attachTo.tagName + (attachTo.id ? "[" + attachTo.id + "]" : "");
	};

};

/**
* Constant representing the DOM "keydown" event.
* @property YAHOO.util.KeyListener.KEYDOWN
* @static
* @final
* @type String
*/
YAHOO.util.KeyListener.KEYDOWN = "keydown";

/**
* Constant representing the DOM "keyup" event.
* @property YAHOO.util.KeyListener.KEYUP
* @static
* @final
* @type String
*/
YAHOO.util.KeyListener.KEYUP = "keyup";