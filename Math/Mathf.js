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
   * Clamps [val] to be in the range [min] - [max].
   * 
   * @param {number} val The number that needs to be clamped.
   * @param {number} min The minimum end of the clamp range.
   * @param {number} max The maximum end of the clamp range.
   * 
   * @returns {number} [val] clamped to remain in the range [min] - [max].
   */
  static Clamp(val, min, max) {
    if(val < min) {
      return min;
    }
    if(val > max) {
      return max;
    }
    return val;
  }

  /**
   * Loops [val] to be in the range [min] - [max].
   * 
   * @param {number} val The number that needs to be looped.
   * @param {number} min The minimum end of the loop range.
   * @param {number} max The maximum end of the loop range.
   * 
   * @returns {number} [val] looped to be in the range [min] - [max].
   */
  static Loop(val, min, max) {
    if(val < min) {
      return val + (max - min);
    }
    if(val > min) {
      return val - (max - min);
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
    let min = Infinity;
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
