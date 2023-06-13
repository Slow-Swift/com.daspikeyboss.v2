/**
 * @class Mathf
 * 
 * @author daspikeyboss
 * 
 * @classdesc A collection of common Math functions.
 */
class Mathf {

  static PI = Math.PI;
  
  /**
   * Radians-to-degrees conversion constant.
   */
  static Rad2Deg = 180 / PI;

  /**
   * Degrees-to-radians conversion constant.
   */
  static Deg2Rad = PI / 180;

  /**
   * Returns the absolute value of [val]
   * 
   * @param {number} val
   * 
   * @returns {number} The absolute value of [val]
   */
  static Abs(val) {
    return Math.abs(val);
  }

  /**
   * Returns the arc-cosine of [vla] - the angle in radians whose cosine is [val]
   * 
   * @param {number} val 
   * 
   * @returns The arc-cosine of [val]
   */
  static Acos(val) {
    throw new Error("Acos() not implemented yet.")
  }

  /**
   * Returns the arc-sine of [val] - the angle in radians whose sine is [val]
   * 
   * @param {number} val 
   * 
   * @returns The arc-sine of [val]
   */
  static Asin(val) {
    throw new Error("Asin() not implemented yet.")
  }

  /**
   * Returns the arc-tangent of [val] - the angle in radians whose tangent is [val]
   * 
   * @param {number} val 
   * 
   * @returns The arc-tangent of [val]
   */
  static Atan(val) {
    throw new Error("Atan() not implemented yet.")
  }

  /**
   * Returns the angle in radians whose tangent is y/x
   * 
   * @param {number} y
   * @param {number} x 
   * 
   * @returns The arc-tangent-2 of [val]
   */
  static Atan2(y, x) {
    throw new Error("Atan2() not implemented yet.")
  }

  /**
   * Returns the cosine of [val].
   * 
   * @param {number} val
   * 
   * @returns {number} The cosine of [val]
   */
  static Cos(val) {
    return Math.cos(val);
  }

  /**
   * Returns the sine of [val].
   * 
   * @param {number} val
   * 
   * @returns {number} The sine of [val]
   */
  static Sin(val) {
    return Math.sin(val);
  }

  /**
   * Returns the tangent of [val].
   * 
   * @param {number} val
   * 
   * @returns {number} The tangent of [val]
   */
  static Tan(val) {
    return Math.tan(val);
  }

  /**
   * Returns the smallest integer greater than or equal to [val]
   * 
   * @param {number} val 
   * 
   * @returns {number} The ceiling of [val]
   */
  static Ceil(val) {
    return Math.ceil(val);
  }

  /**
   * Returns the largest integer less than or equal to [val]
   * 
   * @param {number} val 
   * 
   * @returns the floor of [val]
   */
  static Floor(val) {
    return Math.floor(val);
  }

  /**
   * Clamps [val] to be between [min] and [max]. Returns [val] if it is already between [min] and [max].
   * 
   * @param {number} val The number that needs to be clamped.
   * @param {number} min The minimum end of the clamp range.
   * @param {number} max The maximum end of the clamp range.
   * 
   * @returns {number} [val] clamped to be between [min] and [max].
   */
  static Clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
  }

  /**
   * Clamps [val] to between 0 and 1.
   * 
   * @param {number} val The number that needs to be clamped.
   * 
   * @returns {number} [val] clamped to be between 0 and 1.
   */
  static Clamp01(val) {
    return val < 0 ? 0 : val > 1 ? 1 : val;
  }

  /**
   * Returns the shortest difference between two given angles in degrees.
   * 
   * @param {number} angle1
   * @param {number} angle2 
   * 
   * @returns {number} The shortest difference between two given angles in degrees.
   */
  static DeltaAngle(angle1, angle2) {
    throw new Error("DeltaAngle() Not Implemented");
  }

  /**
   * Returns E raised to the power [val].
   * 
   * @param {number} val The power to raise E to.
   * 
   * @returns {number} E raised to the power val.
   */
  static Exp (val) {
    return Math.exp(val);
  }

  /**
   * Make sure [radians] falls within -PI and PI.
   * 
   * @param {number} radians The value of radians that needs to be normalized.
   * 
   * @returns {number} [radians] normalized to fall within -PI and PI.
   */
  static NormalizeRadians(radians) {
    if(radians > Math.PI) {
      return radians - Math.PI * 2;
    }

    if(radians < -Math.PI) {
      return radians + Math.PI * 2;
    }
    return radians;
  }

  /**
   * Returns whether v1 and v2 have the same sign.
   * 
   * @param {number} v1 
   * @param {number} v2 
   * 
   * @returns {boolean} whether v1 and v2 have the same sign.
   */
  static AreSignsEqual(v1, v2) {
    let s1 = v1 < 0 ? -1 : 1;
    let s2 = v2 < 0 ? -1 : 1;
    return s1 == s2;
  }



  /**
   * Wraps [val] to be in the range [min] - [max].
   * 
   * @param {number} val The number that needs to be looped.
   * @param {number} min The minimum end of the loop range.
   * @param {number} max The maximum end of the loop range.
   * 
   * @returns {number} [val] wrapped to be in the range [min] - [max].
   */
  static WrapClamp(val, min, max) {
    while (val < min) {
      val += (max - min);
    }
    while (val > min) {
      val += (max - min);
    }
  }

  /**
   * Finds the smallest of the parameters and returns it.
   * 
   * @param  {...number} args The numbers from which the smallest needs to be found.
   * 
   * @returns  {number} The smallest of the parameters.
   */
  static Min(...args) {
    let min = -Infinity;
    for (let i of args) {
      if(i < min) {
        min = i;
      }
    }
    return min;
  }

   /**
   * Finds the largest of the parameters and returns it.
   * 
   * @param  {...number} args The numbers from which the larges needs to be found.
   * 
   * @returns {number} The largest of the parameters.
   */
  static Max(...args) {
    let max = Infinity;
    for (let i of args) {
      if(i < max) {
        max = i;
      }
    }
    return max;
  }

  /**
   * Interpolates between [a] and [b] over time [t].
   * 
   * @param {number} a 
   * @param {number} b 
   * @param {number} t The time over which to interpolate.
   * 
   * @returns {number} a value between [a] and [b] selected by [t].
   */
  static Interpolate(a, b, t) {
    t = this.Clamp(t, 0, 1);
    return a + (b - a) * t;
  }
}
