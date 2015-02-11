var Phone = require('Components/Phone');
var MenuItem = require('Components/MenuItem');
var MenuRow = require('Components/MenuRow');

function onload() {
    React.renderComponent(
        <Phone>
            <MenuRow>
                <MenuItem label="Hello"/>
                <MenuItem label="Exposure"/>
                <MenuItem label="Contrast"/>
                <MenuItem label="Saturation"/>
            </MenuRow>
        </Phone>,
        document.body);
}

window.addEventListener('load', onload, false);
