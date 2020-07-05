class Text extends Component {
  textOffset = Vector2.Zero;

  constructor(object, text, color, size, offset, centered, world, font, shadows, ...args) {
    super(object, ...args);
    this.text = text;
    this.color = color;
    this.size =  size;
    this.font = font || "sans-serif";
    this.offset = offset || Vector2.Zero;
    this.centered = centered || false;
    this.world = world || false;
    this.shadows = shadows;
  }

  Update() {
    let c = ctx.shadowColor;
    if(!this.shadows)
      ctx.shadowColor = "rgba(0,0,0,0)";
    if(!this.world) {
      camera.MoveCtxBack();
    }
    CtxHelp.TransformCtx(this.transform);
    ctx.font = this.size + "px " + this.font;
    ctx.fillStyle = this.color;
    ctx.textAlign = this.centered ? "center" : "start";
    let textArr = this.GetTextArray();
    for (var i = 0; i < textArr.length; i++) {
      ctx.fillText(textArr[i], this.offset.x, this.offset.y + this.size * i);
    }
    ctx.restore();
    if(!this.world) {
      camera.MoveCtxOut();
    }
    if(!this.shadows)
      ctx.shadowColor = c;
  }

  GetTextArray() {
    this.text += "";
    return this.text.split("\n");
  }
}
