/**
 * @class ProgramManager
 * 
 * @author daspikeyboss
 * 
 * @classdesc The main manager for the whole program.
 */
class ProgramManager {

  /**
   * Start a new program running.
   */
  static Setup() {
    window.display = new Display(400, 300);
    this.SetupCamera();
    Loop.loop();
    Time.Setup();
    Input.Setup();
    AudioPlayer.Setup();
  }

  /**
   * Setup a new Camera.
   */
  static SetupCamera() {
    let o = new Object("Camera", Vector2.Zero, 0, Vector2.One);
    window.camera = new Camera2D(o);
  }

  /**
   * Close down the running program.
   * 
   * @param {boolean} closeDisplay Should the HTML5 canvas element be removed from the page.
   */
  static CloseProgram(closeDisplay) {
    ObjectManagement.CleanupAllObjects();
    Input.Cleanup();
    Time.Cleanup();
    Loop.Cleanup();
    AudioPlayer.Cleanup();
    display.Destroy(closeDisplay)
  }
}
