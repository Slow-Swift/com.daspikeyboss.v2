/**
 * @class Loop
 * 
 * @author daspikeyboss
 * 
 * @classdesc Handles the main loop.
 */
class Loop {

  /**
   * Subscribe [callback] to Update() or LateUpdate().
   * 
   * @param {function} callback The function that is subscribing to the loop.
   * @param {boolean} late Is the subscription to the LateUpdate (true) or Update (false)
   * @param {number} zOrder The execution order of the function
   */
  static Subscribe(callback, late = false, zOrder = 0.5) {
    //subscribing to the late update?
    if(!late) {
      if(!this.subscribedUpdate.includes(callback) &&
        !this.newlySubscribed.includes(callback)) {
        this.newlySubscribed.push(callback);
        this.subscribedUpdate.push(callback);
        this.subscribedUpdateZ.push(zOrder);
      }
    } else {
      if(!this.subscribedLateUpdate.includes(callback)) {
        this.newlyLateSubscribed.push(callback);
        this.subscribedLateUpdate.push(callback);
        this.subscribedLateUpdateZ.push(zOrder);
      }
    }
    this.SortForZOrders();
  }


  /**
   * Unsubscribe [callback] from Update or LateUpdate
   * 
   * @param {function} callback The function that is unsubscribing from the loop.
   * @param {boolean} late Is the function unsubscribing from LateUpdate (true) or Update (false).
   */
  static Unsubscribe(callback, late) {
    //unsubscribing from the late update?
    if(!late) {
      if(this.subscribedUpdate.includes(callback)) {
        let index = this.subscribedUpdate.indexOf(callback);
        ArrayTools.RemoveItem(this.subscribedUpdate, index);
        ArrayTools.RemoveItem(this.subscribedUpdateZ, index);
      }
    } else {
      if(this.subscribedLateUpdate.includes(callback)) {
        let index = this.subscribedLateUpdate.indexOf(callback);
        ArrayTools.RemoveItem(this.subscribedLateUpdate, index);
        ArrayTools.RemoveItem(this.subscribedLateUpdateZ, index);
      }
    }
  }

  static subscribedUpdate = [];
  static subscribedUpdateZ = [];
  static subscribedLateUpdate = [];
  static subscribedLateUpdateZ = [];
  static newlySubscribed = [];
  static newlyLateSubscribed = [];
  static boundLoop = this.loop.bind(this);
  static _closing = false;

  /**
   * Stops the loop.
   */
  static Cleanup() {
    this._closing = true;
  }

  /**
   * The main loop
   */
  static loop() {
    this.PrepareNewFrame();
    for (let callback of this.subscribedUpdate) {
      if(!this.newlySubscribed.includes(callback))
        callback();
    }

    for (let callback of this.subscribedLateUpdate) {
      if(!this.newlyLateSubscribed.includes(callback))
        callback();
    }

    if(!this._closing)
      requestAnimationFrame(this.boundLoop);
    this.CleanupOldFrame();
  }

  /**
   * Prepeare rendering for a new Frame.
   */
  static PrepareNewFrame() {
    display.ClearDisplay();
    camera.MoveCtxOut();
  }

  /**
   * Clean up from the old Frame.
   */
  static CleanupOldFrame() {
    camera.MoveCtxBack();
    this.newlySubscribed.length = [];
    this.newlyLateSubscribed.length = [];
  }

  //Sort the subscriptions by their zOrders.
  static SortForZOrders() {
    let subscribedUpdate = ArrayTools.CloneArray(this.subscribedUpdate);
    let subscribedUpdateZ = ArrayTools.CloneArray(this.subscribedUpdateZ);
    let subscribedLateUpdate = ArrayTools.CloneArray(this.subscribedLateUpdate);
    let subscribedLateUpdateZ = ArrayTools.CloneArray(this.subscribedLateUpdateZ);
    let sorted = new Array(subscribedUpdate.length);
    let sortedZ = new Array(sorted.length);
    for (var i = 0; i < sorted.length; i++) {
      let largestIndex = 0;
      for (var j = 1; j < subscribedUpdate.length; j++) {
        if(subscribedUpdateZ[j] > subscribedUpdateZ[largestIndex]) {
          largestIndex = j;
        }
      }
      sorted[i] = subscribedUpdate[largestIndex];
      sortedZ[i] = subscribedUpdateZ[largestIndex];
      ArrayTools.RemoveItem(subscribedUpdateZ, largestIndex);
      ArrayTools.RemoveItem(subscribedUpdate, largestIndex);
    }
    this.subscribedUpdate = sorted;
    this.subscribedUpdateZ = sortedZ;

    sorted = new Array(this.subscribedLateUpdate.length);
    sortedZ = new Array(sorted.length);
    for (var i = 0; i < sorted.length; i++) {
      let largestIndex = 0;
      for (var j = 1; j < this.subscribedLateUpdate.length; j++) {
        if(this.subscribedLateUpdateZ[j] > this.subscribedLateUpdateZ[largestIndex]) {
          largestIndex = j;
        }
      }
      sorted[i] = this.subscribedLateUpdate[largestIndex];
      sortedZ[i] = this.subscribedLateUpdateZ[largestIndex];
      ArrayTools.RemoveItem(this.subscribedLateUpdateZ, largestIndex);
      ArrayTools.RemoveItem(this.subscribedLateUpdate, largestIndex);
    }
    this.subscribedLateUpdate = sorted;
    this.subscribedLateUpdateZ = sortedZ;
  }
}
