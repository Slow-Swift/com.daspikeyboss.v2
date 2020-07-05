// WARNING: static operation methods will be removed
// WARNING: class operation methods will be changed to return new vectors
//  instead of changing the old one. already returns new vector. Update your
//  code where possible to use this update.
class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  Add(v) {
    this.x += v.x;
    this.y += v.y;
    return this.clone;
  }

  Subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this.clone;
  }

  MultiplyS(s) {
    this.x *= s;
    this.y *= s;
    return this.clone;
  }

  Multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this.clone;
  }

  DivideS(s) {
    this.x /= s;
    this.y /= s;
    return this.clone;
  }

  Divide(v) {
     this.x / v.x;
     this.y / v.y;
     return this.clone;
   }

  Normalize() {
    let norm = this.normalized;
    this.x = norm.x;
    this.y = norm.y;
  }

  Dot(v) {
    return this.x * v.x + this.y * v.y;
    return this.clone;
  }

  Interpolate(v, t) {
    t = Mathf.Clamp(t, 0, 1);
    return Vector2.Add(this, Vector2.MultiplyS(Vector2.Subtract(v, this), t));
  }

  get magnitude() {
    return Math.sqrt(this.Dot(this));
  }

  toString(parenthesis=true) {
    let string = parenthesis ? "(" : "";
    string += this.x + ", " + this.y;
    string += parenthesis ? ")" : "";
    return string;
  }

  Equals(v) {
    return this.x == v.x && this.y == v.y;
  }

  set magnitude(val) {
    if(this.magnitude == 0) {
      this.x = val;
    } else {
      let m = this.magnitude;
      this.x *= val / m;
      this.y *= val / m;
    }
  }

  get angle() {
    return Mathf.NormalizeRadians(Math.atan2(this.y, this.x));
  }

  set angle(val) {
    let m = this.magnitude;
    this.x = m * Math.cos(val);
    this.y = m * Math.sin(val);
  }

  get normalized() {
    let mag = this.magnitude;
    let x = this.x / mag;
    let y = this.y / mag;
    return new Vector2(x, y);
  }

  get clone() {
    return new Vector2(this.x, this.y);
  }

  static get Zero() {
    return new Vector2(0, 0);
  }

  static get One() {
    return new Vector2(1, 1);
  }

  static VectorFromAngleAndMagnitude(angle, magnitude) {
    let v = this.One;
    v.magnitude = magnitude;
    v.angle = angle;
    return v;
  }

  static Add(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  static Subtract(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  static MultiplyS(v, s) {
    return new Vector2(v.x * s, v.y * s);
  }
}
