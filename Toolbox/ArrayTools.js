class ArrayTools {
  static CloneArray(arr) {
    let a = [];
    for (let o of arr) {
      a.push(o);
    }
    return a;
  }

  static CloneObjectProperties(obj) {
    let o = {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        o[p] = obj[p];
      }
    }
    return o;
  }

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
