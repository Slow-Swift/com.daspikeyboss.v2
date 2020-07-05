//// NOTE: Colors Do not affect anything because rgba
//  does not work correctly with colors.
class SceneFader extends Component{

  static fadingCount = 0;

  constructor(object, time, middleCallbacks, finishCallbacks,
    startColor = new Vector4(0,0,0,0), middleColor=new Vector4(0,0,0,1),
    finishColor = new Vector4(0,0,0,0)) {
      super(object, -5);
      this.fadeTime = time;
      this.startTime = Time.time;
      this.middleCallbacks = middleCallbacks;
      this.finishCallbacks = finishCallbacks;
      this.startColor = startColor;
      this.middleColor = middleColor;
      this.finishColor = finishColor;
      this.passedHalf = false;
    SceneFader.fadingCount++;
  }

  Update() {
    camera.MoveCtxBack();
    let elapsedTime = Time.time - this.startTime;
    let elapsedPercentDec = elapsedTime / this.fadeTime * 2;
    let c;
    if(!this.passedHalf) {
      c = this.startColor.Interpolate(this.middleColor, elapsedPercentDec);
      if(elapsedPercentDec >= 1) {
        this.passedHalf = true;
        for(let mc of this.middleCallbacks) {
          mc();
        }
      }
    } else {
      c = this.middleColor.Interpolate(this.finishColor, elapsedTime - 1)
    }
    ctx.fillStyle = "rgba" + c.toString();
    ctx.fillRect(0,0,canvas.width, canvas.height);
    camera.MoveCtxOut();
    if(elapsedPercentDec >= 2) {
      for(let fc of this.finishCallbacks) {
        fc();
      }
      SceneFader.fadingCount--;
      this.object.Destroy();
    }
  }
}
