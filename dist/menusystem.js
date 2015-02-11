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

	var Phone = __webpack_require__(3);
	var MenuItem = __webpack_require__(1);
	var MenuRow = __webpack_require__(2);

	function onload() {
	    React.renderComponent(
	        React.createElement(Phone, null, 
	            React.createElement(MenuRow, null, 
	                React.createElement(MenuItem, {label: "Hello"}), 
	                React.createElement(MenuItem, {label: "Exposure"}), 
	                React.createElement(MenuItem, {label: "Contrast"}), 
	                React.createElement(MenuItem, {label: "Saturation"})
	            )
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