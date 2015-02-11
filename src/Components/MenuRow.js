// A row of MenuItems

var MenuItemRowStyle = {
    'position': 'absolute',
    'width': '100%',
    'height': '80px',
    'bottom': '0px'
};

var MenuItemRow = React.createClass({
    render: function() {
        return <div style={MenuItemRowStyle} className="MenuItemRow">{this.props.children}</div>;
    }
});

module.exports = MenuItemRow;
