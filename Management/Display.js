class Display {
  shadowColor = "rgba(0,0,0,0.5)";

  constructor(width, height) {
    window.canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.insertAdjacentElement('beforeEnd', canvas);
    window.ctx = canvas.getContext('2d');
  }

  clearColor = "white";

  ClearDisplay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

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

  Destroy(removeCanvas, drawOverScreen, color) {
    if(removeCanvas) {
      document.body.removeChild(canvas);
    } else if(drawOverScreen) {
      let c = color != null ? color : this.clearColor;
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  TurnShadowsOff() {
    ctx.shadowColor = "rgba(0,0,0,0)";
  }

  TurnShadowsOn() {
    ctx.shadowColor = this.shadowColor;
  }

}
