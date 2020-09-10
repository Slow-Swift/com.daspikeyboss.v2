/**
 * @class Random
 * 
 * @author daspikeyboss
 * 
 * @classdesc Provides functions for dealing with random numbers.
 */
class Random {

  /**
   * Returns a random number between [min] and [max].
   * 
   * @param {number} max The maximum end of the range (exclusive).
   * @param {number} min The minimum end of the range (inclusive).
   * @param {boolean} whole Should the number be a whole number?
   * 
   * @returns {number} A random number.
   */
  Random(max, min, whole) {
    //organize max and min
    let max2 = Math.max(max, min);
    let min2 = Math.min(max, min);
    max = max2;
    min = min2;

    if(!min) min =0;
    let val = Math.random();
    val *= max - min;
    val += min;
    if(whole)
      val = Math.floor(val);
    return val;
  }
}
