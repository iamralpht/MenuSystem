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

var MenuItem = React.createClass({
    render: function() {
        return (
        <div {...this.props} style={MenuItemStyle} className="MenuItem">
            <div style={LabelStyle} className="Label">{this.props.label}</div>
        </div>);
    }
});

module.exports = MenuItem;
