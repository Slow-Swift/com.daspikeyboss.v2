class Vector4 {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  Add(v) {
    return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }

  Subtract(v) {
    return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  }

  MultiplyS(s) {
    return new Vector4(this.x * s, this.y * s, this.z * s, this.w * s);
  }

  Multiply(v) {
    return new Vector4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
  }

  DivideS(s) {
    return this.MultiplyS(this, 1/s);
  }

  Divide(v) {
     return new Vector2(this.x / v.x, this.y / v.y, this.z / v.z, this.w / v.w);
   }

  Normalize() {
    let norm = this.normalized;
    this.x = norm.x;
    this.y = norm.y;
  }

  Dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }

  Interpolate(v, t) {
    t = Mathf.Clamp(t, 0, 1);
    return this.Add(v.Subtract(this).MultiplyS(t));
  }

  get magnitude() {
    return Math.sqrt(this.Dot(this));
  }

  toString(parenthesis=true) {
    let string = parenthesis ? "(" : "";
    string += this.x + ", " + this.y + ", " + this.z + ", " + this.w;
    string += parenthesis ? ")" : "";
    return string;
  }

  Equals(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z && this.w == v.w;
  }

  set magnitude(val) {
    if(this.magnitude == 0) {
      this.x = val;
    } else {
      let m = this.magnitude;
      this.x *= val / m;
      this.y *= val / m;
      this.z *= val / m;
      this.w *= val / m;
    }
  }

  get normalized() {
    let mag = this.magnitude;
    let x = this.x / mag;
    let y = this.y / mag;
    let z = this.z / mag;
    let w = this.w / mag;
    return new Vector4(x, y, z, w);
  }

  get clone() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  static get Zero() {
    return new Vector4(0, 0, 0, 0);
  }

  static get One() {
    return new Vector4(1, 1, 1, 1);
  }
}
