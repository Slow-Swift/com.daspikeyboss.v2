class Button extends Component {

  constructor(object, width, height, imgSrc, callback, spriteOrder, ...args) {
    super(object, ...args);
    this.coll = new BoxCollider2D(this.object, width, height);
    this.imageSrc = imgSrc;
    this.spriteOrder = spriteOrder;
    this._RequireComponent(Sprite, imgSrc, true, spriteOrder);
    this.callback = callback;
    this.originalScale = this.transform.scale;
  }

  Update() {
    if(SceneFader.fadingCount > 0)
      return;
      
    if(this.object.isMouseOver && Input.GetMouseButtonDown(0)) {
      this.callback();
    }
  }

  OnMouseOver() {
    this.transform.scale = this.transform.scale.MultiplyS(1.1);
  }

  OnMouseExit() {
    this.transform.scale = this.transform.scale.MultiplyS(1/1.1);
  }
}
