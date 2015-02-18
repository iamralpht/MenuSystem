// Menu controller

var MenuItem = require('Components/MenuItem');
var MenuRow = require('Components/MenuRow');
var MenuStack = require('Model/MenuStack');

var Menu = React.createClass({
    getInitialState: function() {
        var menuStack = new MenuStack();
        menuStack.addRow(this.props.menu);

        var self = this;
        Gravitas.createAnimation(menuStack, function() { self.setState({ layout: menuStack.layout() }); });

        return { stack: menuStack, layout: menuStack.layout() };
    },
    render: function() {
        var menuStack = this.state.stack;

        function openMenuItem(menuItem) {
            menuStack.addRow(menuItem);
        }
        function closeLastRow() {
            menuStack.closeLastRow();
        }

        // Compute the positions for the child rows.
        var menuItems = this.state.layout;
        var children = [];

        for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems[i];
            children.push(<MenuRow style={{transform: item.transform, opacity: item.opacity}}><MenuItem label="Hello"/></MenuRow>);
        }

        return <div className="menu">{children}</div>;
    }
});

module.exports = Menu;
