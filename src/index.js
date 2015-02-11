var Phone = require('Components/Phone');
var MenuItem = require('Components/MenuItem');

function onload() {
    React.renderComponent(<Phone><MenuItem label="Hello"/></Phone>, document.body);
}

window.addEventListener('load', onload, false);
