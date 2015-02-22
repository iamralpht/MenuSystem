// Model for a MenuItem, contains menu information as well as transform information.

var COLLAPSE_SPRING_COLLAPSED_POSITION = 0.4;
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
MenuRow.prototype.animationDone = function() { return this._openSpring.done() && this._collapseSpring.done(); }
MenuRow.prototype.hasAnimatedAway = function() { return this._openSpring.done() && Math.round(this._openSpring.x() * 100) == 0; }

// This models the physics/layout for the whole menu.
function MenuStack() {
    this._rows = [];
    this._animationDone = false;
}
MenuStack.prototype.addRow = function(description) {
    this._animationDone = false;

    for (var i = 0; i < this._rows.length; i++) {
        this._rows[i].setCollapsed(true);
    }
    var newRow = new MenuRow(description);
    newRow.setOpen(true);
    this._rows.push(newRow);
}
MenuStack.prototype.closeLastRow = function() {
    if (this._rows.length <= 1) return;

    this._animationDone = false;
    this._rows[this._rows.length - 1].setOpen(false);
    if (this._rows.length >= 2)
        this._rows[this._rows.length - 2].setCollapsed(false);
}
MenuStack.prototype.layout = function() {
    this._animationDone = true;
    var positions = [];
    var yoffset = MENU_ROW_HEIGHT * (1 - COLLAPSE_SPRING_COLLAPSED_POSITION);

    var remainingRows = [];

    // Walk the array backwards and tweak the y-offset so that the menu rows
    // move downwards as a new one opens on top.
    for (var i = this._rows.length - 1; i > 0; i--) {
        yoffset += this._rows[i]._openSpring.x() * MENU_ROW_HEIGHT * COLLAPSE_SPRING_COLLAPSED_POSITION;
    }

    for (var i = 0; i < this._rows.length; i++) {
        // Are we still animating? Check every row.
        this._animationDone &= this._rows[i].animationDone();

        // Maybe this row has animated away, in which case don't
        // remember it for next time.
        if (!this._rows[i].hasAnimatedAway())
            remainingRows.push(this._rows[i]);

        var pos = this._rows[i].computeBounds(yoffset);
        yoffset = pos.yoffset;
        positions.push(pos);
    }
    
    this._rows = remainingRows;

    return positions;
}
MenuStack.prototype.done = function() { return false; }//this._animationDone; }

module.exports = MenuStack;
