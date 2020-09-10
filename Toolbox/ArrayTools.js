/**
 * @class ArrayTools
 * 
 * @author daspikeyboss
 * 
 * @classdesc A bunch of handy functions for working with Arrays.
 */
class ArrayTools {

  /**
   * Copies all the data from [arr] to a new array
   * 
   * @param {Array} arr The array the data needs to be copied from.
   * 
   * @returns {Array} A new array with the same data as the old one.
   */
  static CloneArray(arr) {
    let a = [];
    for (let o of arr) {
      a.push(o);
    }
    return a;
  }

  /**
   * Copies the properties from [obj] to a new Object.
   * 
   * @param {Object} obj The object that needs to have it properties copied.
   * 
   * @returns {Object} A new object with the same properties as the old one.
   */
  static CloneObjectProperties(obj) {
    let o = {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        o[p] = obj[p];
      }
    }
    return o;
  }

  /**
   * Removes the item at [index] from [array].
   * 
   * @param {Array} array The array that needs to have an item removed.
   * @param {number} index The index of the item that needs to be removed.
   * 
   * @returns {*} The item that was removed from the Array.
   */
  static RemoveItem(array, index) {
    if(index < 0 || index > array.length-1)
      return null;

    if(array.length / index > 0.5) {
      for (var i = index-1; i >= 0; i--) {
        array[i+1] = array[i];
      }
      return array.shift();
    } else {
      for (var i = index+1; i < array.length; i++) {
        array[i-1] = index[i];
      }
      return array.pop();
    }
  }
}
