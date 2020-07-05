class Checkbox extends Component {
  constructor(object, config) {
    super(object);
    this.width = config.width;
    this.backColor = config.backColor;
    this.borderColor = config.borderColor;
    this.checked = config.checked;
    this.shadows = config.shadows;
    this.checkColor = config.checkColor;
    this.checkThickness = config.checkThickness;
    new BoxCollider2D(this.object, this.width, this.width);
  }

  Update() {
    if(this.shadows)
      display.TurnShadowsOn();
    else
      display.TurnShadowsOff();

    if(Input.GetMouseButtonDown(0) && this.object.isMouseOver) {
      this.checked = !this.checked;
    }

    CtxHelp.TransformCtx(this.transform);
    ctx.fillStyle = this.borderColor;
    ctx.fillRect(-this.width * 0.55, -this.width * 0.55, this.width * 1.1,
      this.width * 1.1);
    ctx.fillStyle = this.backColor;
    display.TurnShadowsOff();
    ctx.fillRect(-this.width / 2, -this.width / 2, this.width, this.width);

    if(this.checked) {
      ctx.beginPath();
      ctx.strokeStyle = this.checkColor;
      ctx.lineWidth = this.checkThickness;
      ctx.moveTo(-this.width * 0.65, 0);
      ctx.lineTo(0, this.width * 0.65);
      ctx.lineTo(this.width * 0.6, -this.width * 0.7);
      ctx.stroke();
    }

    display.TurnShadowsOff();
    ctx.restore();
  }
}
