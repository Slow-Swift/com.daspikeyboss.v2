/**
 * @class KeyboardState
 * 
 * @author daspikeyboss
 * 
 * @classdesc Holds the current state of the Keyboard.
 */
class KeyboardState {

  /**
   * The state the keyboard was in last frame.
   */
  static oldState = {};

  /**
   * The state the keyboard is in now.
   */
  static currentState = {};

  /**
   * Setup the class before using it.
   */
  static Setup() {
    this._bndUpdate = this._UpdateState.bind(this);
    Loop.Subscribe(this._bndUpdate, true);
  }

  static _UpdateState() {
    this.oldState = ArrayTools.CloneObjectProperties(this.currentState);
  }

  /**
   * Cleanup the class before closing the program.
   */
  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate, true);
    document.onkeydown = null;
    document.onkeyup = null;
  }

}

/**
 * Event function called automatically by the window when a key is pressed.
 * 
 * @param {Object} e The event data.
 */
document.onkeydown = function(e) {
  KeyboardState.currentState[e.key] = true;
  if(window.displayKeyName)
    console.log(e.key);
}


/**
 * Event function called automatically by the window when a key is released.
 * 
 * @param {Object} e The event data.
 */
document.onkeyup = function(e) {
  KeyboardState.currentState[e.key] = false;

}
