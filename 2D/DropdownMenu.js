class DropdownMenu extends Component {

  constructor(object, dropdown, ...args) {
    super(object, 0.3, ...args);
    this.dropdown = dropdown;
  }

  Update() {
    this.DrawMenuBackgrounds();
    this.HandleInput();
  }

  DrawMenuBackgrounds() {
    ctx.fillStyle = this.dropdown.textColor;
    ctx.textAlign = "center";
    ctx.font = canvas.height / 20 + "px sans-serif";
    for (var i = 0; i < this.dropdown.items.length; i++) {
      this.DrawArea(canvas.width / 2, canvas.height * 0.12 * (i + 0.8),
        canvas.width / 2, canvas.height * 0.04);
      ctx.fillText(this.dropdown.items[i].name, canvas.width / 2,
        canvas.height * 0.12 * (i + 0.9));
    }
    ctx.textAlign = "start";
  }

  HandleInput() {
    if(Input.GetMouseButtonDown(0)) {
      let mp = Input.mousePosition;
      if(mp.x > canvas.width * 0.25 && mp.x < canvas.width * 0.75) {
        let index = Math.floor((mp.y-canvas.height*0.045) / (canvas.height * 0.12));
        if(index >= 0 && index < this.dropdown.items.length) {
          this.dropdown.itemIndex = index;
          this.dropdown.itemSelectedCallback(index);
        }
      }
      this.dropdown.menuOpen = false;
    }
  }

  DrawArea(x, y, width, height) {
    if(this.dropdown.shadows)
      display.TurnShadowsOn();
    else
      display.TurnShadowsOff();

    ctx.save();
    ctx.translate(x, y);

    let halfWidth = width / 2;
    let halfHeight = height / 2;
    let curveRadius = halfWidth * 0.05;

    ctx.fillStyle = this.dropdown.color;
    ctx.strokeStyle = this.dropdown.borderColor;
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
}
