class Slider extends Component {
  constructor(object, config, ...args) {
    super(object, ...args)
    this.startPos = config.startPos;
    this.endPos = config.endPos;
    this.thickness = config.thickness;
    this.backColor = config.backColor || "grey";
    this.frontColor = config.frontColor || "white";
    this.handleColor = config.handleColor || "black";
    this.min = config.min || 0;
    this.max = config.max || 100;
    this.wholeNumbers = config.wholeNumbers;
    this.shadows = config.shadows;
    this.handle = new SliderHandle("SliderHandle", this, this.zOrder - 0.01);
    this.text = new Text(this.object, "0", config.textColor, this.thickness * 2,
      new Vector2(this.endPos.x + this.thickness, this.thickness * 0.8));
    this.value = config.value || 0;
  }

  Update() {
    if(this.shadows) {
      display.TurnShadowsOn();
    } else {
      display.TurnShadowsOff();
    }
    CtxHelp.TransformCtx(this.transform);
    this.DrawLine(this.backColor, 1);
    display.TurnShadowsOff();
    this.DrawLine(this.frontColor, this.percentFilled);
    if(!this.shadows)
      display.TurnShadowsOn();
    ctx.restore();
    let sx = this.transform.position.x + this.startPos.x *
      this.transform.scale.x;
    let ex = this.transform.position.x + this.endPos.x *
      this.transform.scale.x;
    let hx = this.handle.transform.position.x;
    this._value = -(hx - sx) / (ex - sx) * (this.min - this.max) + this.min;
    if(this.wholeNumbers)
      this.text.text = Math.round(this.value);
    else
      this.text.text = Math.round(this.value * 100) / 100;
    display.TurnShadowsOn();
  }


  DrawLine(color, lengthPercent) {
    let halfThickness = this.thickness / 2;
    let endPos = this.startPos.Interpolate(this.endPos, lengthPercent);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.startPos.x + halfThickness, this.startPos.y, halfThickness,
      Math.PI / 2, Math.PI * 3 / 2);
    ctx.arc(endPos.x - halfThickness, this.endPos.y, halfThickness,
      Math.PI * 3/ 2, Math.PI / 2);
    ctx.fill();
  }

  OnEnable() {
    if(this.handle)
      this.handle.SetActive(true);
  }

  OnDisable() {
    if(this.handle)
      this.handle.SetActive(false);
  }

  set percentFilled(val) {
    this.value = -val * (this.min - this.max) + this.min;
  }

  get percentFilled() {
    return (this._value - this.min) / (this.max - this.min);
  }

  set value(val) {
    this._value = val;
    this.handle.transform.position.x = -(1-this.percentFilled) * (this.endPos.x *
      this.transform.scale.x - this.startPos.x * this.transform.scale.x) -
      this.startPos.x * this.transform.scale.x + this.transform.position.x;
  }

  get value() {
    return this._value;
  }
}
