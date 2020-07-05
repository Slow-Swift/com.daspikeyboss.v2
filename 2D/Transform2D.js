class Transform2D {
  constructor(position, rot, scale) {
    this.position = position
    this.rotation = rot;
    this.scale = scale;
  }

  Translate(delta, space) {
    if(space == "self") {
      this.position = this.LocalVectorToWorld(delta)
    } else {
      this.position.Add(delta);
    }
  }

  Rotate(delta) {
    this.rotation.Add(delta);
  }

  Scale(delta) {
    this.scale.Add(delta);
  }

  LocalVectorToWorld(v, scale) {
    let a = this.rotation + v.angle;
    let vec = Vector2.VectorFromAngleAndMagnitude(a, v.magnitude);
    if(scale) {
      vec.Multiply(this.scale);
    }
    vec.Add(this.position);
    return vec;
  }

  set rotation(val) {
    if(!(val instanceof Vector2)) {
      this.rotationVector = Vector2.VectorFromAngleAndMagnitude(val, 1);
    } else {
      this.rotationVector = val;
    }
  }

  get rotation() {
    return this.rotationVector.angle;
  }

  WorldVectorToLocal(v, scale) {
    v.Subtract(this.position);
    if(scale) {
      v.x /= this.scale.x;
      v.y /= this.scale.y;
    }
    v.angle = v.angle - this.rotation.angle;
  }

  TurnTowards(point, maxTurn, viewOffset = 0) {
    let toTargetVector = Vector2.Subtract(point, this.position);
    let angle = Mathf.NormalizeRadians(toTargetVector.angle + viewOffset);
    let relativeAngle = angle - this.rotation;

    if(Math.abs(relativeAngle) <= maxTurn) {
      this.rotation = angle;
      return true;
    }

    let targetInTopQuadrants = angle > -Math.PI/2 && angle < Math.PI/2;
    let sameSign = Mathf.AreSignsEqual(angle, this.rotation);

    if(targetInTopQuadrants || sameSign) {
      if(relativeAngle > 0) {
        this.rotation += maxTurn;
      } else {
        this.rotation -= maxTurn;
      }
    } else {
      if(relativeAngle > 0) {
        this.rotation -= maxTurn;
      } else {
        this.rotation += maxTurn;
      }
    }

    return false;
  }

}
