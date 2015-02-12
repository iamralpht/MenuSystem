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
	        { label: "Contrast", open: true, children: [ { label: "More Contrast" } ] },
	        { label: "Saturation" }
	    ]
	};

	function onload() {
	/*
	            <MenuRow>
	                <MenuItem label="Hello"/>
	                <MenuItem label="Exposure"/>
	                <MenuItem label="Contrast"/>
	                <MenuItem label="Saturation"/>
	            </MenuRow>
	            */
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
	        React.createElement("div", {style: MenuItemStyle, className: "MenuItem"}, 
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
	        return React.createElement("div", {style: MenuItemRowStyle, className: "MenuItemRow"}, this.props.children);
	    }
	});

	module.exports = MenuItemRow;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Menu controller

	var MenuItem = __webpack_require__(1);
	var MenuRow = __webpack_require__(2);

	// This object takes a description of a recursive menu and builds it using MenuRows and MenuItems.
	// It handles when MenuItems are activated and either opens the submenu, backs up to the parent
	// menu or calls a function to the outside world.

	function makeChildrenRecursive(description, outChildren) {
	    var openChild = null;
	    var items = [];
	    for (var i = 0; i < description.children.length; i++) {
	        var child = description.children[i];

	        items.push(React.createElement(MenuItem, {label: child.label}));
	        if (child.open) openChild = child;
	    }
	    outChildren.push(React.createElement(MenuRow, null, items));
	    if (openChild) makeChildrenRecursive(openChild, outChildren);
	}

	var Menu = React.createClass({displayName: "Menu",
	    render: function() {
	        var children = [];
	        var root = this.props.menu;

	        makeChildrenRecursive(root, children);

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


/***/ }
/******/ ])