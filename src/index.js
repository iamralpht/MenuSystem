var MenuItem = require('Components/MenuItem');

function onload() {
    React.renderComponent(<MenuItem label="Hello"/>, document.body);
}

window.addEventListener('load', onload, false);
