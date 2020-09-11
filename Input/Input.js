/**
 * @class Input
 * 
 * @author daspikeyboss
 * 
 * @classdesc Handles collection of Keyboard and Mouse Inputs.
 */
class Input {

  /**
   * Prepare the class before use.
   */
  static Setup() {
    KeyboardState.Setup();
    MouseState.Setup();
  }

  /**
   * Cleanup the class before stopping the Program.
   */
  static Cleanup() {
    KeyboardState.Cleanup();
    MouseState.Cleanup();
  }

  /**
   * Was [key] just pressed?
   * 
   * @param {string} key The key to check.
   * 
   * @returns {boolean} Whether [key] has been pressed since the last frame.
   */
  static GetKeyDown(key) {
    return KeyboardState.currentState[key] && !KeyboardState.oldState[key]
  }

  /**
   * Was [key] just released?
   * 
   * @param {string} key The key to check.
   * 
   * @returns {boolean} Whether [key] has been released since the last frame.
   */
  static GetKeyUp(key) {
    return !KeyboardState.currentState[key] && KeyboardState.oldState[key]
  }

  /**
   * Is [key] held down?
   * 
   * @param {string} key The key to check.
   * 
   * @returns {boolean} Whether [key] is currently down.
   */
  static GetKey(key) {
    return KeyboardState.currentState[key];
  }

  /**
   * Is mouse button [id] held down?
   * 
   * @param {number} id The id of the mouse button to check.
   * 
   * @returns {boolean} Whether mouse button [id] is currently down.
   */
  static GetMouseButton(id) {
    return MouseState.currentState[id];
  }

  /**
   * Was mouse button [id] just pressed?
   * 
   * @param {number} id The id of the mouse button to check.
   * 
   * @returns {boolean} Whether mouse button [id] was pressed since the last frame.
   */
  static GetMouseButtonDown(id) {
    return MouseState.currentState[id] && !MouseState.oldState[id];
  }

  /**
   * Was mouse button [id] just released?
   * 
   * @param {number} id The id of the mouse button to check.
   * 
   * @return {boolean} Whether mouse button [id] was pressed since the last frame.
   */
  static GetMouseButtonUp(id) {
    return !MouseState.currentState[id] && MouseState.oldState[id];
  }

  /**
   * How much the mouse was scrolled since last frame.
   * 
   * @type Vector2
   */
  static get mouseScroll() {
    return MouseState.currentState.scroll;
  }

  /**
   * The position of the mouse pointer relative to the HTML5 canvas element.
   * 
   * @type Vector2
   */
  static get mousePosition() {
    return new Vector2(MouseState.currentState.x, MouseState.currentState.y);
  }
}
