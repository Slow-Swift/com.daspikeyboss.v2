class Time {

  static Setup() {
    this.timeMillis = 0;
    this.totalTimeMillis = 0;
    this.deltaTimeMillis = 0;
    this._startDate = new Date();
    this._oldDate = new Date();
    this._newDate = new Date();
    this._bndUpdate = this._UpdateTime.bind(this);
    Loop.Subscribe(this._bndUpdate);
  }

  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate);
    this.deltaTimeMillis = 0;
  }

  static _UpdateTime() {
    this._newDate = new Date();
    this.totalTimeMillis = this._newDate - this._startDate;
    if(!this._paused) {
      this.deltaTimeMillis = this._newDate - this._oldDate;
      this.timeMillis += this.deltaTimeMillis;
      this._oldDate = this._newDate;
    }
  }

  static get deltaTime() {
    if(!this._paused) {
      return this.deltaTimeMillis / 1000;
    } else {
      return 0;
    }
  }

  static get time() {
    return this.timeMillis / 1000;
  }

  static set paused(val) {
    this._paused = val;
    if(!val) {
      this._oldDate = new Date();
    }
  }

  static get paused() {
    return this._paused;
  }
}
