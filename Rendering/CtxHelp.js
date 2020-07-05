class CtxHelp {

  static TransformCtx(transform2D) {
    ctx.save();
    ctx.translate(transform2D.position.x, transform2D.position.y);
    ctx.rotate(transform2D.rotation);
    ctx.scale(transform2D.scale.x, transform2D.scale.y);
  }

}
