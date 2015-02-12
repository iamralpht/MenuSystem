var Phone = require('Components/Phone');
var MenuItem = require('Components/MenuItem');
var MenuRow = require('Components/MenuRow');
var Menu = require('Components/Menu');

var menuDescription = {
    children: [
        { label: "Hello" },
        { label: "Exposure" },
        { label: "Contrast", open: true, children: [ { label: "More Contrast" } ] },
        { label: "Saturation" }
    ]
};

function onload() {
/*
            <MenuRow>
                <MenuItem label="Hello"/>
                <MenuItem label="Exposure"/>
                <MenuItem label="Contrast"/>
                <MenuItem label="Saturation"/>
            </MenuRow>
            */
    React.renderComponent(
        <Phone>
            <Menu menu={menuDescription}></Menu>
        </Phone>,
        document.body);
}

window.addEventListener('load', onload, false);
