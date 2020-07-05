class SliderHandle extends Component {
  constructor(object, slider, ...args) {
    super(object, ...args);
    this.slider = slider;
    this.color = this.slider.handleColor;
    this.transform.scale = this.slider.transform.scale.clone;
    this.transform.position = this.slider.transform.position.clone;
    this.thickness = this.slider.thickness;
    this.moving = false;
    new BoxCollider2D(this.object, this.thickness, this.thickness * 2);
  }

  Update() {
    this.HandleInput();
    CtxHelp.TransformCtx(this.transform);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.thickness / 2, -this.thickness, this.thickness,
      this.thickness * 2);
    ctx.restore();
  }

  HandleInput() {
    let sliderSX = this.slider.transform.position.x + this.slider.startPos.x
      * this.transform.scale.x;
    let sliderEX = this.slider.transform.position.x + this.slider.endPos.x
      * this.transform.scale.x;

    if(Input.GetMouseButtonUp(0)) {
      this.moving = false;
    }
    if(Input.GetMouseButtonDown(0) && this.object.isMouseOver) {
      this.moving = true;
    }
    if(this.moving) {
      let mx = Input.mousePosition.x;
      let sx = this.slider.transform.position.x;
      mx = Mathf.Clamp(mx, sliderSX, sliderEX);
      this.transform.position.x = mx;
    }
    //this.slider.percentFilled = (this.transform.position.x - sliderSX) /
      //(sliderEX-sliderSX);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.transform.position.MultiplyS(scale);
  }

}
