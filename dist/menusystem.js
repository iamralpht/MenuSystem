/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Phone = __webpack_require__(4);
	var MenuItem = __webpack_require__(1);
	var MenuRow = __webpack_require__(2);
	var Menu = __webpack_require__(3);


	var menuDescription = {
	    children: [
	        { label: "Hello" },
	        { label: "Exposure" },
	        { label: "Contrast", children: [ { label: "More Contrast" } ] },
	        { label: "Saturation" }
	    ]
	};

	function onload() {
	    React.renderComponent(
	        React.createElement(Phone, null, 
	            React.createElement(Menu, {menu: menuDescription})
	        ),
	        document.body);
	}

	window.addEventListener('load', onload, false);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// A single MenuItem. It has an icon and a label, and may have children.

	var MenuItemStyle = {
	    // Position menu items absolutely (at the origin). We will manage thier positions ourselves with transforms.
	    'position': 'relative',
	    'box-sizing': 'border-box', // Use the width/height we give it, don't include the border.
	    'display': 'inline-block', // layout horizontally.
	    'margin': '0 7px',
	    'left': '10px',
	    'width': '60px',
	    'height': '60px',
	    // Make the MenuItem round.
	    'border-radius': '40px',
	    // Add a border
	    'border': '2px solid #808080'

	};

	var LabelStyle = {
	    'position': 'absolute',
	    'width': '80px',
	    'text-align': 'center',
	    'left': '-10px',
	    'bottom': '-20px',
	    'font-weight': 'bold',
	    'font-size': '12px',
	    'color': 'white',
	    'text-shadow': '0px 2px 2px #808080'
	};

	var MenuItem = React.createClass({displayName: "MenuItem",
	    render: function() {
	        return (
	        React.createElement("div", React.__spread({},  this.props, {style: MenuItemStyle, className: "MenuItem"}), 
	            React.createElement("div", {style: LabelStyle, className: "Label"}, this.props.label)
	        ));
	    }
	});

	module.exports = MenuItem;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// A row of MenuItems

	var MenuItemRowStyle = {
	    'position': 'absolute',
	    'width': '100%',
	    'height': '80px',
	    'bottom': '0px'
	};

	var MenuItemRow = React.createClass({displayName: "MenuItemRow",
	    render: function() {
	        var style = {};
	        for (var k in MenuItemRowStyle) {
	            if (MenuItemRowStyle.hasOwnProperty(k))
	                style[k] = MenuItemRowStyle[k];
	        }
	        if (this.props.style) {
	            for (var k in this.props.style) {
	                if (this.props.style.hasOwnProperty(k))
	                    style[k] = this.props.style[k];
	            }
	        }
	        return React.createElement("div", {style: style, className: "MenuItemRow"}, this.props.children);
	    }
	});

	module.exports = MenuItemRow;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Menu controller

	var MenuItem = __webpack_require__(1);
	var MenuRow = __webpack_require__(2);
	var MenuStack = __webpack_require__(5);

	var Menu = React.createClass({displayName: "Menu",
	    getInitialState: function() {
	        var menuStack = new MenuStack();
	        menuStack.addRow(this.props.menu);

	        var self = this;
	        Gravitas.createAnimation(menuStack, function() { self.setState({ layout: menuStack.layout() }); });

	        return { stack: menuStack, layout: menuStack.layout() };
	    },
	    render: function() {
	        var menuStack = this.state.stack;
	        var self = this;

	        function openMenuItem(menuItem) {
	            console.log('open menu item ', menuItem);
	            menuStack.addRow(menuItem);
	            self.setState({ layout: menuStack.layout() });
	        }
	        function closeLastRow() {
	            console.log('close last row...');
	            menuStack.closeLastRow();
	            self.setState({ layout: menuStack.layout() });
	        }

	        // Compute the positions for the child rows.
	        var menuItems = this.state.layout;
	        var children = [];

	        for (var i = 0; i < menuItems.length; i++) {
	            var item = menuItems[i];
	            // Clicking on anything but the last MenuRow should pop the current one off.
	            var onTap = (i == menuItems.length - 1) ? openMenuItem : closeLastRow;
	            var items = [];
	            if (item.description.children) {
	                for (var j = 0; j < item.description.children.length; j++) {
	                    var child = item.description.children[j];
	                    items.push(React.createElement(MenuItem, {label: child.label, onClick: onTap.bind(null, child)}));
	                }
	            }

	            children.push(React.createElement(MenuRow, {style: {transform: item.transform, opacity: item.opacity}}, items));
	        }

	        return React.createElement("div", {className: "menu"}, children);
	    }
	});

	module.exports = Menu;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// A box that's the shape of a phone display.

	// Use inline styles.
	var phoneStyle = {
	    'position': 'relative',
	    'margin': 'auto',
	    'width': '320px',
	    'height': '480px',
	    'background-color': 'black',
	};

	var Phone = React.createClass({displayName: "Phone",
	    render: function() {
	        return React.createElement("div", {style: phoneStyle}, this.props.children);
	    }
	});

	module.exports = Phone;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Model for a MenuItem, contains menu information as well as transform information.

	var COLLAPSE_SPRING_COLLAPSED_POSITION = 0.2;
	var MENU_ROW_HEIGHT = 80;
	var COLLAPSED_MENU_ROW_HEIGHT = MENU_ROW_HEIGHT * COLLAPSE_SPRING_COLLAPSED_POSITION;

	function MenuRow(description) {
	    this._description = description;
	    this._xoffset = 0;      // Horizontal scroll amount.

	    // More interesting modeling stuff.
	    this._openSpring = new Gravitas.Spring(1, 200, 20); // Bounce open when tapped.
	    this._collapseSpring = new Gravitas.Spring(1, 200, 20); // Shrink downward when shrunken.

	    this._openSpring.snap(0);
	    this._collapseSpring.snap(1);
	}
	MenuRow.prototype.setOpen = function(isOpen) { this._openSpring.setEnd(isOpen ? 1 : 0); }
	MenuRow.prototype.setCollapsed = function(isCollapsed) { this._collapseSpring.setEnd(isCollapsed ? COLLAPSE_SPRING_COLLAPSED_POSITION : 1); }
	MenuRow.prototype.moving = function() { return !this._openSpring.done() || !this._collapseSpring.done(); }
	// Compute the y position and scale of this MenuRow.
	MenuRow.prototype.computeBounds = function(yoffset) {
	    var properties = {};
	    var scale = this._openSpring.x() * this._collapseSpring.x();
	    properties.opacity = scale;
	    properties.transform = 'translateY(' + (yoffset - MENU_ROW_HEIGHT * scale) + 'px) scale(' + scale + ') translateX(' + this._xoffset + 'px)';
	    properties.yoffset = yoffset - MENU_ROW_HEIGHT * scale;
	    properties.description = this._description;
	    return properties;
	}
	MenuRow.prototype.animationDone = function() { return this._openSpring.done() && this._collapseSpring.done(); }
	MenuRow.prototype.hasAnimatedAway = function() { return this._openSpring.done() && Math.round(this._openSpring.x() * 100) == 0; }

	// This models the physics/layout for the whole menu.
	function MenuStack() {
	    this._rows = [];
	    this._animationDone = false;
	}
	MenuStack.prototype.addRow = function(description) {
	    this._animationDone = false;

	    for (var i = 0; i < this._rows.length; i++) {
	        this._rows[i].setCollapsed(true);
	    }
	    var newRow = new MenuRow(description);
	    newRow.setOpen(true);
	    this._rows.push(newRow);
	}
	MenuStack.prototype.closeLastRow = function() {
	    if (this._rows.length <= 1) return;

	    this._animationDone = false;
	    this._rows[this._rows.length - 1].setOpen(false);
	    if (this._rows.length >= 2)
	        this._rows[this._rows.length - 2].setCollapsed(false);
	}
	MenuStack.prototype.layout = function() {
	    this._animationDone = true;
	    var positions = [];
	    var yoffset = 0;

	    var remainingRows = [];


	    for (var i = 0; i < this._rows.length; i++) {
	        // Are we still animating? Check every row.
	        this._animationDone &= this._rows[i].animationDone();

	        // Maybe this row has animated away, in which case don't
	        // remember it for next time.
	        if (!this._rows[i].hasAnimatedAway())
	            remainingRows.push(this._rows[i]);

	        var pos = this._rows[i].computeBounds(yoffset);
	        yoffset = pos.yoffset;
	        positions.push(pos);
	    }
	    
	    this._rows = remainingRows;

	    return positions;
	}
	MenuStack.prototype.done = function() { return false; }//this._animationDone; }

	module.exports = MenuStack;


/***/ }
/******/ ])