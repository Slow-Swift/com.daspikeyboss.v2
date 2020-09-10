/**
 * @class CtxHelp
 * 
 * @author daspikeyboss
 * 
 * @classdesc Provides some helper functions for working with the 2d HTML5 canvas context.
 */
class CtxHelp {

  /**
   * Transforms the canvas context to be in tandem with [transform2D].
   * 
   * @param {Transform2D} transform2D The transform that ctx needs to be aligned with.
   */
  static TransformCtx(transform2D) {
    ctx.save();
    ctx.translate(transform2D.position.x, transform2D.position.y);
    ctx.rotate(transform2D.rotation);
    ctx.scale(transform2D.scale.x, transform2D.scale.y);
  }

}
