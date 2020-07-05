class Mathf {

  static PI = Math.PI;

  static ToDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  static ToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  static NormalizeRadians(radians) {
    if(radians > Math.PI) {
      return radians - Math.PI * 2;
    }

    if(radians < -Math.PI) {
      return radians + Math.PI * 2;
    }
    return radians;
  }

  static AreSignsEqual(v1, v2) {
    let s1 = v1 < 0 ? -1 : 1;
    let s2 = v2 < 0 ? -1 : 1;
    return s1 == s2;
  }

  static Clamp(val, min, max) {
    if(val < min) {
      return min;
    }
    if(val > max) {
      return max;
    }
    return val;
  }

  static Loop(val, min, max) {
    if(val < min) {
      return val + (max - min);
    }
    if(val > min) {
      return val - (max - min);
    }
  }

  static Min(...args) {
    let min = Infinity;
    for (let i of args) {
      if(i < min) {
        min = i;
      }
    }
    return min;
  }

  static Max(...args) {
    let max = Infinity;
    for (let i of args) {
      if(i < max) {
        max = i;
      }
    }
    return max;
  }

  static Interpolate(a, b, t) {
    t = this.Clamp(t, 0, 1);
    return a + (b - a) * t;
  }
}
