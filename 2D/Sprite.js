class Sprite extends Component {
  constructor(gameobject, imageSrc, shadows=true, ...args) {
    super(gameobject, ...args);
    this.image = new Image();
    this.image.src = imageSrc;
    this.shadows = shadows;

  }

  Update() {
    if(this.shadows)
      display.TurnShadowsOn();
    else
      display.TurnShadowsOff();

    CtxHelp.TransformCtx(this.transform);
    ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    ctx.restore();

    display.TurnShadowsOn();
  }

  set src(val) {
    this.image.src = val;
  }
}
