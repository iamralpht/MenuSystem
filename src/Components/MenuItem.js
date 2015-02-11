// A single MenuItem. It has an icon and a label, and may have children.

var MenuItem = React.createClass({
    render: function() {
        return (
        <div className="MenuItem">
            <div className="Label">{this.props.label}</div>
        </div>);
    }
});

module.exports = MenuItem;
