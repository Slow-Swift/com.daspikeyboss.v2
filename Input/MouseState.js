class MouseState {
  static oldState = {};
  static currentState = {};

  static Setup() {
    this._bndUpdate = this._UpdateState.bind(this);
    Loop.Subscribe(this._bndUpdate, true);
  }

  static _UpdateState() {
    this.oldState = ArrayTools.CloneObjectProperties(this.currentState);
    this.currentState.scroll = 0;
  }

  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate, true);
  }
}

document.onmousemove = function(e) {
  if(e.path[0] == canvas) {
    MouseState.currentState.x = e.offsetX;
    MouseState.currentState.y = e.offsetY;
  } else {
    MouseState.currentState.x = -1;
    MouseState.currentState.y = -1;
  }
}

document.onmousedown = function(e) {
  MouseState.currentState[e.button] = true;
}

document.onmouseup = function(e) {
  MouseState.currentState[e.button] = false;
}

document.onmousewheel = function(e) {
  MouseState.currentState.scroll = e.deltaY;
}
