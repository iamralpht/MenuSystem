// A row of MenuItems

var MenuItemRowStyle = {
    'position': 'absolute',
    'width': '100%',
    'height': '80px',
    'bottom': '0px',
    '-webkit-transform-origin': '50% 0',
    'transform-origin': '50% 0'
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
        return <div {...this.props} style={style} className="MenuItemRow">{this.props.children}</div>;
    }
});

module.exports = MenuItemRow;
