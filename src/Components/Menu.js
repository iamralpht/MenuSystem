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
                    items.push(<MenuItem label={child.label} onClick={onTap.bind(null, child)}/>);
                }
            }

            children.push(<MenuRow style={{transform: item.transform, opacity: item.opacity}}>{items}</MenuRow>);
        }

        return <div className="menu">{children}</div>;
    }
});

module.exports = Menu;
