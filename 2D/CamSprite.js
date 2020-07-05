class CamSprite extends Sprite {
  constructor(...args) {
    super(...args);
  }

  Update() {
    camera.MoveCtxBack();
    super.Update();
    camera.MoveCtxOut();
  }
}
