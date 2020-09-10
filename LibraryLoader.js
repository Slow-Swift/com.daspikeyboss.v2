/**
 * @author daspikeyboss
 * 
 * @classdesc Class dedicated to loading scripts and libraries.
 */

class LibraryLoader {

  static scriptsToLoad = [];
  static callbacks = [];
  static libraryCallback = "";

  static loadingScript = false;

  /**
   * Loads a script.
   * 
   * @param {string} script The URL of the script that needs to be loaded.
   * @param {function} callback The function that will be called when the script has finished loading.
   */
  static LoadScript(script, callback) {
    this.callbacks[this.scriptsToLoad.length] = callback;
    this.scriptsToLoad.push(script);
    if(!this.loadingScript)
      this._LoadNextScript();
  }

  /**
   * Loads multiple scripts.
   * 
   * @param {Array} scripts 
   * @param {function} callback 
   */
  static LoadScripts(scripts, callback) {

    for (let script of scripts) {
      this.scriptsToLoad.push(script);
    }

    this.callbacks[this.scriptsToLoad.length - 1] = callback;
    if(!this.loadingScript)
      this._LoadNextScript();
  }

  /**
   * Loads the next script in the list of scripts to load.
   */
  static _LoadNextScript() {
    this.loadingScript = true;
    let tag = document.createElement("script");
    tag.src = this.scriptsToLoad[0];
    tag.onload = this._ScriptLoaded.bind(this);
    document.head.insertAdjacentElement('beforeEnd', tag);
  }

  /**
   * When a scpript has finished loading this begins loading the next script and calls the callback function.
   */
  static _ScriptLoaded() {
    let callback = this.callbacks[0];
    this.scriptsToLoad.shift();
    this.callbacks.shift();

    if(this.scriptsToLoad.length > 0) {
      this._LoadNextScript();
    } else {
      this.loadingScript = false;
    }

    if(callback)
      callback();
  }


  /**
   * Loads the DaSpikeyBossLibrary V2
   * 
   * @param {string} libraryLocation The location of the library relative to the project.
   * @param {function} callback The function to be called when the library has finished loading.
   */
  static LoadLibrary(libraryLocation, callback) {
    let stl = ['../com.daspikeyboss/Management/ProgramManager.js',
    '../com.daspikeyboss/Management/Loop.js',
    '../com.daspikeyboss/Management/Display.js',
    '../com.daspikeyboss/Management/Time.js',
    '../com.daspikeyboss/Management/ObjectManagement.js',
    '../com.daspikeyboss/2D/Transform2D.js',
    '../com.daspikeyboss/Math/Vector2.js',
    '../com.daspikeyboss/Math/Vector4.js',
    '../com.daspikeyboss/Math/Mathf.js',
    '../com.daspikeyboss/Objects/Object.js',
    '../com.daspikeyboss/Objects/Component.js',
    '../com.daspikeyboss/Rendering/CtxHelp.js',
    '../com.daspikeyboss/2D/Sprite.js',
    '../com.daspikeyboss/2D/Collider2D.js',
    '../com.daspikeyboss/2D/CircleCollider.js',
    '../com.daspikeyboss/2D/Camera2D.js',
    '../com.daspikeyboss/2D/Text.js',
    '../com.daspikeyboss/2D/RigidBody2D.js',
    '../com.daspikeyboss/2D/BoxCollider2D.js',
    '../com.daspikeyboss/2D/Button.js',
    '../com.daspikeyboss/2D/SceneFader.js',
    '../com.daspikeyboss/2D/CamSprite.js',
    '../com.daspikeyboss/2D/Slider.js',
    '../com.daspikeyboss/2D/SliderHandle.js',
    '../com.daspikeyboss/2D/Checkbox.js',
    '../com.daspikeyboss/2D/Dropdown.js',
    '../com.daspikeyboss/2D/DropdownMenu.js',
    '../com.daspikeyboss/2D/AnimatedSprite.js',
    '../com.daspikeyboss/2D/CameraButton.js',
    '../com.daspikeyboss/Input/KeyboardState.js',
    '../com.daspikeyboss/Input/MouseState.js',
    '../com.daspikeyboss/Input/Input.js',
    '../com.daspikeyboss/Toolbox/ArrayTools.js',
    '../com.daspikeyboss/Toolbox/Random.js',
    '../com.daspikeyboss/Toolbox/AudioPlayer.js',]
    this.libraryCallback = callback;
    this.LoadScripts(stl, this.LoadLibraryFinished.bind(this));
  }

  /**
   * Sets up the ProgramManager and calls the callback function when the library has finished loading.
   */
  static LoadLibraryFinished() {
    ProgramManager.Setup();
    this.libraryCallback();
  }

}
