// A box that's the shape of a phone display.

// Use inline styles.
var phoneStyle = {
    'position': 'relative',
    'margin': 'auto',
    'width': '320px',
    'height': '480px',
    'background-color': 'black',
};

var Phone = React.createClass({
    render: function() {
        return <div style={phoneStyle}>{this.props.children}</div>;
    }
});

module.exports = Phone;
