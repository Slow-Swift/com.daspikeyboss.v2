class AnimatedSprite extends Component {

  animations = {};
  animationStartTime = 0;

  constructor(gameobject, animations, shadows="false", ...args) {
    super(gameobject, ...args);
    this.LoadAnimations(animations);
  }

  LoadAnimations(animations) {
    for (var animation of animations) {
      let animationName = animation.shift();
      let animationImages = [];
      animationImages[0] = animation.shift();
      this.animations[animationName] = animationImages;
      for (var i = 0; i < animation.length; i++) {
        let image = new Image();
        image.src = animation[i];
        animationImages[i+1] = image;

        if(!this.currentImage) {
          this.currentImage = image;
        }
      }
    }
  }

  Update() {
    this.UpdateAnimation();
    this.DrawSelf();
  }

  DrawSelf() {
    if(this.shadows)
      display.TurnShadowsOn();
    else
      display.TurnShadowsOff();
    CtxHelp.TransformCtx(this.transform);
    ctx.drawImage(this.currentImage, -this.currentImage.width / 2, -this.currentImage.height / 2);
    ctx.restore();
    display.TurnShadowsOn();
  }

  UpdateAnimation() {
    if(!this.currentAnimation || !this.playingAnimation)
      return;

    let currentAnimation = this.animations[this.currentAnimation];
    let duration = currentAnimation[0];
    let elapsedTime = Time.time - this.animationStartTime;
    if(elapsedTime >= duration && !this.looping) {
      this.playingAnimation = false;
      return;
    }

    elapsedTime %= duration;
    let tpf = duration / (currentAnimation.length-1);
    let frame = Math.floor(elapsedTime/tpf) + 1;
    this.currentImage = currentAnimation[frame];
  }

  ShowAnimation(animationName, loop) {
    this.currentAnimation = animationName;
    this.looping = loop;
    this.animationStartTime = Time.time;
    this.playingAnimation = true;
  }

  StopAnimation() {
    this.playingAnimation = false;
  }
}
