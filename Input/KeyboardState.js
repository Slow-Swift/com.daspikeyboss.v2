class KeyboardState {

  static oldState = {};
  static currentState = {};

  static Setup() {
    this._bndUpdate = this._UpdateState.bind(this);
    Loop.Subscribe(this._bndUpdate, true);
  }

  static _UpdateState() {
    this.oldState = ArrayTools.CloneObjectProperties(this.currentState);
  }

  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate, true);
    document.onkeydown = null;
    document.onkeyup = null;
  }

}

document.onkeydown = function(e) {
  KeyboardState.currentState[e.key] = true;
  if(window.displayKeyName)
    console.log(e.key);
}

document.onkeyup = function(e) {
  KeyboardState.currentState[e.key] = false;

}
