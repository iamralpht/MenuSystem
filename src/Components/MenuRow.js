// A row of MenuItems

var MenuItemRowStyle = {
    'position': 'absolute',
    'width': '100%',
    'height': '80px',
    'bottom': '0px'
};

var MenuItemRow = React.createClass({
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
        return <div style={style} className="MenuItemRow">{this.props.children}</div>;
    }
});

module.exports = MenuItemRow;
