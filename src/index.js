var Phone = require('Components/Phone');
var MenuItem = require('Components/MenuItem');
var MenuRow = require('Components/MenuRow');
var Menu = require('Components/Menu');


var menuDescription = {
    children: [
        { label: "Hello" },
        { label: "Exposure" },
        { label: "Contrast", children: [ { label: "More Contrast" } ] },
        { label: "Saturation" }
    ]
};

function onload() {
    React.renderComponent(
        <Phone>
            <Menu menu={menuDescription}></Menu>
        </Phone>,
        document.body);
}

window.addEventListener('load', onload, false);
