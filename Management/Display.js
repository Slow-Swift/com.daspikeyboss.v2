/**
 * @class Display
 * 
 * @author daspikeyboss
 * 
 * @classdesc Handles the HTML5 canvas element.
 */
class Display {

  /**
   * The color of ctx shadows.
   */
  shadowColor = "rgba(0,0,0,0.5)";
  
  /**
   * The color that replaces old frames.
   */
  clearColor = "white";

  /**
   * @constructor
   * 
   * 
   * @param {number} width The width of the display in pixels.
   * @param {number} height The height if the display in pixels.
   */
  constructor(width, height) {
    window.canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.insertAdjacentElement('beforeEnd', canvas);
    window.ctx = canvas.getContext('2d');
  }

  /**
   * Clear the display of the last frame.
   */
  ClearDisplay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Resizes the display.
   * 
   * @param {number} width The new width of the display in pixels.
   * @param {number} height The new height of the display in pixels.
   */
  Resize(width, height) {
    let sx = ctx.shadowOffsetX;
    let sy = ctx.shadowOffsetY;
    let sb = ctx.shadowBlur;
    let oldSize = new Vector2(canvas.width, canvas.height);
    let scale = width / oldSize.x;
    canvas.width = width;
    canvas.height = height;
    ObjectManagement.OnDisplayResized(oldSize);
    ctx.shadowOffsetX = sx * scale;
    ctx.shadowOffsetY = sy * scale;
    ctx.shadowBlur = sb * scale;
  }

  /**
   * Close down the Display.
   * 
   * @param {boolean} removeCanvas Remove the canvas element from the page?
   * @param {boolean} drawOverScreen Replace the last frame with a solid color?
   * @param {Color | String} color The color to replace the last frame with.
   */
  Destroy(removeCanvas = false, drawOverScreen = false, color = null) {
    if(removeCanvas) {
      document.body.removeChild(canvas);
    } else if(drawOverScreen) {
      let c = color != null ? color : this.clearColor;
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * Turn off ctx shadows.
   */
  TurnShadowsOff() {
    ctx.shadowColor = "rgba(0,0,0,0)";
  }

  /**
   * Revert ctx shadows to before they were turned off.
   */
  TurnShadowsOn() {
    ctx.shadowColor = this.shadowColor;
  }

}
