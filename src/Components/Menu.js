// Menu controller

var MenuItem = require('Components/MenuItem');
var MenuRow = require('Components/MenuRow');

// This object takes a description of a recursive menu and builds it using MenuRows and MenuItems.
// It handles when MenuItems are activated and either opens the submenu, backs up to the parent
// menu or calls a function to the outside world.

function makeChildrenRecursive(description, outChildren) {
    var openChild = null;
    var items = [];
    for (var i = 0; i < description.children.length; i++) {
        var child = description.children[i];

        items.push(<MenuItem label={child.label}></MenuItem>);
        if (child.open) openChild = child;
    }
    outChildren.push(<MenuRow>{items}</MenuRow>);
    if (openChild) makeChildrenRecursive(openChild, outChildren);
}

var Menu = React.createClass({
    render: function() {
        var children = [];
        var root = this.props.menu;

        makeChildrenRecursive(root, children);

        return <div className="menu">{children}</div>;
    }
});

module.exports = Menu;
