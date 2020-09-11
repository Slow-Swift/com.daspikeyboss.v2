/**
 * @class Time
 * 
 * @author daspikeyboss
 * 
 * @classdesc A class for managing Time.
 */
class Time {

  /**
   * Reset the class.
   */
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

  /**
   * Do some cleanup operations before closing down.
   */
  static Cleanup() {
    Loop.Unsubscribe(this._bndUpdate);
    this.deltaTimeMillis = 0;
  }


  /**
   * Update all the time variables.
   */
  static _UpdateTime() {
    this._newDate = new Date();
    this.totalTimeMillis = this._newDate - this._startDate;
    if(!this._paused) {
      this.deltaTimeMillis = this._newDate - this._oldDate;
      this.timeMillis += this.deltaTimeMillis;
      this._oldDate = this._newDate;
    }
  }

  /**
   * Get the time difference between this frame and the last frame.
   * 
   * @returns {number} The time difference between this frame and the last frame.
   */
  static get deltaTime() {
    if(!this._paused) {
      return this.deltaTimeMillis / 1000;
    } else {
      return 0;
    }
  }


  /**
   * Get the total amount of time that has passed since the class was last reset.
   * 
   * @returns {number} the total amount of time that has passes (in seconds) since the class was reset.
   */
  static get time() {
    return this.timeMillis / 1000;
  }

  /**
   * Set the paused state of the Program.
   */
  static set paused(val) {
    this._paused = val;
    if(!val) {
      this._oldDate = new Date();
    }
  }

  /**
   * Is the game paused?
   * 
   * @returns The paused state of the program.
   */
  static get paused() {
    return this._paused;
  }
}
