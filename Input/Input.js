class Input {
  static Setup() {
    KeyboardState.Setup();
    MouseState.Setup();
  }

  static Cleanup() {
    KeyboardState.Cleanup();
    MouseState.Cleanup();
  }

  static GetKeyDown(key) {
    return KeyboardState.currentState[key] && !KeyboardState.oldState[key]
  }

  static GetKeyUp(key) {
    return !KeyboardState.currentState[key] && KeyboardState.oldState[key]
  }

  static GetKey(key) {
    return KeyboardState.currentState[key];
  }

  static GetMouseButton(id) {
    return MouseState.currentState[id];
  }

  static GetMouseButtonDown(id) {
    return MouseState.currentState[id] && !MouseState.oldState[id];
  }

  static GetMouseButtonUp(id) {
    return !MouseState.currentState[id] && MouseState.oldState[id];
  }

  static get mouseScroll() {
    return MouseState.currentState.scroll;
  }

  static get mousePosition() {
    return new Vector2(MouseState.currentState.x, MouseState.currentState.y);
  }
}
