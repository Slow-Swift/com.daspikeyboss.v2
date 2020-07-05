class ProgramManager {
  static Setup() {
    window.display = new Display(400, 300);
    this.SetupCamera();
    Loop.loop();
    Time.Setup();
    Input.Setup();
    AudioPlayer.Setup();
  }

  static SetupCamera() {
    let o = new Object("Camera", Vector2.Zero, 0, Vector2.One);
    window.camera = new Camera2D(o);
  }

  static CloseProgram(closeDisplay) {
    ObjectManagement.CleanupAllObjects();
    Input.Cleanup();
    Time.Cleanup();
    Loop.Cleanup();
    AudioPlayer.Cleanup();
    display.Destroy(closeDisplay)
  }
}
