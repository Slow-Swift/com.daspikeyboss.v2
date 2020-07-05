class Dropdown extends Component {

  constructor(object, config, ...args) {
    super(object, ...args);
    this.width = config.width;
    this.height = config.height;
    this.color = config.color;
    this.borderColor = config.borderColor;
    this.textColor = config.textColor;
    this.shadows = config.shadows;
    this.items = config.items;
    this.itemIndex = config.itemIndex;
    this.itemSelectedCallback = config.callback;
    this.selectedText = new Text(this.object, "baa", this.textColor,
      canvas.height * 0.05, new Vector2(-this.width * 0.48, this.height * 0.2), 0,
      0, 0, 0, 0.4);
    this.dropdownMenu = new DropdownMenu(this.object, this);
    new BoxCollider2D(this.object, this.width, this.height);
    this.menuOpen = false;
  }

  Update() {
    if(Input.GetMouseButtonDown(0) && this.object.isMouseOver && !this.menuOpen) {
      this.menuOpen = true;
    }

    CtxHelp.TransformCtx(this.transform);
    this.DrawArea();
    this.DrawArrow();
    this.selectedText.text = this.items[this.itemIndex].name;
    ctx.restore();
  }

  DrawMenu() {
    for (var i = 0; i < this.items.length; i++) {
      this.DrawMenuArea(canvas.width / 2, canvas.width * 0.06 * (i + 1),
        canvas.width / 2, canvas.height * 0.04);
    }
  }

  DrawMenuArea(x, y, width, height) {
    if(this.shadows)
      display.TurnShadowsOn();
    else
      display.TurnShadowsOff();

    ctx.save();
    ctx.translate(x, y);

    let halfWidth = width / 2;
    let halfHeight = height / 2;
    let curveRadius = halfWidth * 0.05;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = halfWidth * 0.05;

    ctx.beginPath();
    ctx.moveTo(halfWidth, halfHeight * 0.95);
    ctx.arc(halfWidth * 0.95, halfHeight * 0.95, curveRadius, 0, Math.PI / 2);
    ctx.arc(-halfWidth * 0.95, halfHeight * 0.95, curveRadius, Math.PI / 2,
      Math.PI);
    ctx.arc(-halfWidth * 0.95, -halfHeight * 0.95, curveRadius, Math.PI,
      Math.PI * 3 / 2);
    ctx.arc(halfWidth * 0.95, -halfHeight * 0.95, curveRadius,
      Math.PI * 3 / 2, 0);
    ctx.lineTo(halfWidth, halfHeight * 0.95);
    ctx.stroke();
    display.TurnShadowsOff();
    ctx.fill();
    display.TurnShadowsOn();

    ctx.restore();
  }

  DrawArrow() {
    display.TurnShadowsOff();
    ctx.strokeStyle = this.textColor;
    ctx.lineWidth = this.width * 0.02;
    ctx.beginPath();
    ctx.moveTo(this.width * 0.3, -this.height * 0.2);
    ctx.lineTo(this.width * 0.375, this.height * 0.2);
    ctx.lineTo(this.width * 0.45, -this.height * 0.2);
    ctx.stroke();
    display.TurnShadowsOff();
  }

  DrawArea() {
    if(this.shadows)
      display.TurnShadowsOn();
    else
      display.TurnShadowsOff();

    let halfWidth = this.width / 2;
    let halfHeight = this.height / 2;
    let curveRadius = halfWidth * 0.05;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = halfWidth * 0.05;

    ctx.beginPath();
    ctx.moveTo(halfWidth, halfHeight * 0.95);
    ctx.arc(halfWidth * 0.95, halfHeight * 0.95, curveRadius, 0, Math.PI / 2);
    ctx.arc(-halfWidth * 0.95, halfHeight * 0.95, curveRadius, Math.PI / 2,
      Math.PI);
    ctx.arc(-halfWidth * 0.95, -halfHeight * 0.95, curveRadius, Math.PI,
      Math.PI * 3 / 2);
    ctx.arc(halfWidth * 0.95, -halfHeight * 0.95, curveRadius,
      Math.PI * 3 / 2, 0);
    ctx.lineTo(halfWidth, halfHeight * 0.95);
    ctx.stroke();
    display.TurnShadowsOff();
    ctx.fill();
    display.TurnShadowsOn();
  }

  OnEnable() {
    if(this.selectedText)
      this.selectedText.SetActive(true);
    if(this.dropdownMenu)
      this.dropdownMenu.SetActive(this.menuOpen);
  }

  OnDisable() {
    if(this.selectedText)
      this.selectedText.SetActive(false);
    if(this.dropdownMenu)
      this.dropdownMenu.SetActive(false);
  }

  set menuOpen(val) {
    this._menuOpen = val;
    this.dropdownMenu.SetActive(val);
  }

  get menuOpen() {
    return this._menuOpen;
  }

}
