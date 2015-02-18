// Model for a MenuItem, contains menu information as well as transform information.

var COLLAPSE_SPRING_COLLAPSED_POSITION = 0.2;
var MENU_ROW_HEIGHT = 80;
var COLLAPSED_MENU_ROW_HEIGHT = MENU_ROW_HEIGHT * COLLAPSE_SPRING_COLLAPSED_POSITION;

function MenuRow(description) {
    this._description = description;
    this._xoffset = 0;      // Horizontal scroll amount.

    // More interesting modeling stuff.
    this._openSpring = new Gravitas.Spring(1, 200, 20); // Bounce open when tapped.
    this._collapseSpring = new Gravitas.Spring(1, 200, 20); // Shrink downward when shrunken.

    this._openSpring.snap(0);
    this._collapseSpring.snap(1);
}
MenuRow.prototype.setOpen = function(isOpen) { this._openSpring.setEnd(isOpen ? 1 : 0); }
MenuRow.prototype.setCollapsed = function(isCollapsed) { this._collapseSpring.setEnd(isCollapsed ? COLLAPSE_SPRING_COLLAPSED_POSITION : 1); }
MenuRow.prototype.moving = function() { return !this._openSpring.done() || !this._collapseSpring.done(); }
// Compute the y position and scale of this MenuRow.
MenuRow.prototype.computeBounds = function(yoffset) {
    var properties = {};
    var scale = this._openSpring.x() * this._collapseSpring.x();
    properties.opacity = scale;
    properties.transform = 'translateY(' + (yoffset - MENU_ROW_HEIGHT * scale) + 'px) scale(' + scale + ') translateX(' + this._xoffset + 'px)';
    properties.yoffset = yoffset - MENU_ROW_HEIGHT * scale;
    properties.description = this._description;
    return properties;
}

// This models the physics/layout for the whole menu.
function MenuStack() {
    this._rows = [];
}
MenuStack.prototype.addRow = function(description) {
    for (var i = 0; i < this._rows.length; i++) {
        this._rows.setCollapsed(true);
    }
    var newRow = new MenuRow(description);
    newRow.setOpen(true);
    this._rows.push(newRow);
}
MenuStack.prototype.closeLastRow = function() {
    if (this._rows.length == 0) return;
    this._rows[this._rows.length - 1].setOpen(false);
    if (this._rows.length >= 2)
        this._rows[this._rows.length - 2].setCollapsed(false);
}
MenuStack.prototype.layout = function() {
    var positions = [];
    var yoffset = 0;
    for (var i = 0; i < this._rows.length; i++) {
        var pos = this._rows[i].computeBounds(yoffset);
        yoffset = pos.yoffset;
        positions.push(pos);
    }
    return positions;
}
MenuStack.prototype.done = function() { return false; }

module.exports = MenuStack;
