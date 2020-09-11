/**
 * @class MouseState
 * 
 * @author daspikeyboss
 * 
 * @classdesc Holds the current state of the mouse.
 */
class MouseState {

  /**
   * The state the mouse was in last frame.
   */
  static oldState = {};

  /**
   * The state the mouse is in now.
   */
  static currentState = {};

  /**
   * Setup the class before using it.
   */
  static Setup() {
    this._bndUpdate = this._UpdateState.bind(this);
    Loop.Subscribe(this._bndUpdate, true);
  }

  /**
   * Update the state of the mouse
   */
  static _UpdateState() {
    this.oldState = ArrayTools.CloneObjectProperties(this.currentState);
    this.currentState.scroll = 0;
  }

  /**
   * Cleanup the class before closing the program.
   */
  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate, true);
  }
}

/**
 * Event function called automatically by the window when the mouse is moved.
 * 
 * @param {Object} e The event data.
 */
document.onmousemove = function(e) {
  if(e.path[0] == canvas) {
    MouseState.currentState.x = e.offsetX;
    MouseState.currentState.y = e.offsetY;
  } else {
    MouseState.currentState.x = -1;
    MouseState.currentState.y = -1;
  }
}

/**
 * Event function called automatically by the window when a mouse button is pressed.
 * 
 * @param {Object} e The event data.
 */
document.onmousedown = function(e) {
  MouseState.currentState[e.button] = true;
}


/**
 * Event function called automatically by the window when a mouse button is released
 * 
 * @param {Object} e The event data.
 */
document.onmouseup = function(e) {
  MouseState.currentState[e.button] = false;
}

/**
 * Event function called automatically by the window when the mouse is scrolled.
 * 
 * @param {Object} e The event data.
 */
document.onmousewheel = function(e) {
  MouseState.currentState.scroll = e.deltaY;
}
