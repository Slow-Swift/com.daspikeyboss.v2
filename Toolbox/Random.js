class Random {
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
