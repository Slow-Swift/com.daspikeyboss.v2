class CameraButton extends Button {

  constructor(...args) {
    super(...args);
    this.object.FindComponentOfType(Sprite).Destroy();
    new CamSprite(this.object, this.imageSrc, true, this.spriteOrder);
  }


}
