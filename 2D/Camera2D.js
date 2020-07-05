class Camera2D extends Component {
  position = Vector2.Zero;
  scale = Vector2.One;
  rotation = 0;

  MoveCtxOut() {
    ctx.scale(1/this.transform.scale.x, 1/this.transform.scale.y);
    let zoomXChange = (canvas.width/2) * this.transform.scale.x - canvas.width/2;
    let zoomYChange = (canvas.height/2) * this.transform.scale.y - canvas.height/2;
    ctx.translate(-this.transform.position.x + zoomXChange, -this.transform.position.y + zoomYChange);
    ctx.rotate(-this.transform.rotation);

  }

  MoveCtxBack() {

    ctx.rotate(this.transform.rotation);
    let zoomXChange = (canvas.width/2) * this.transform.scale.x - canvas.width/2;
    let zoomYChange = (canvas.height/2) * this.transform.scale.y - canvas.height/2;
    ctx.translate(this.transform.position.x - zoomXChange, this.transform.position.y - zoomYChange);
    ctx.scale(this.transform.scale.x, this.transform.scale.y);
    this.transform.position = this.position;
    this.transform.rotation = this.rotation;
    this.transform.scale = this.scale;
  }
}
