class ObjectManagement {

  static objects = [];

  static FindObjectByName(name, active=true) {
    for (let object of this.objects) {
      if(object.name == name && (!active || object.active)) {
        return object;
      }
    }
  }

  static FindObjectsByName(name, active=true) {
    let objects = [];
    for (let object of this.objects) {
      if(object.name == name && (!active || object.active)) {
        objects.push(object);
      }
    }
    return objects;
  }

  static FindObjectByTag(tag, active=true) {
    for (let object of this.objects) {
      if(object.tag == tag && (!active || object.active)) {
        return object;
      }
    }
  }

  static FindObjectsByTag(tag, active=true) {
    let objects = [];
    for (let object of this.objects) {
      if(object.tag == tag && (!active || object.active)) {
        objects.push(object);
      }
    }
    return objects;
  }

  static FindObjectOfType(type, active=true) {
    for (let object of this.objects) {
      let comp = object.FindComponentOfType(type);
      if(comp != null && (!active || comp.active)) {
        return comp;
      }
    }
  }

  static FindObjectsOfType(type, active=true) {
    let components = [];
    for (let object of this.objects) {
      let comp = object.FindComponentOfType(type);
      if(comp != null && (!active || comp.active)) {
        components.push(comp);
      }
    }
    return components;
  }

  static AddObject(object) {
    this.objects.push(object);
  }

  static RemoveObject(object) {
    let index = this.objects.indexOf(object);
    if(index < 0)
      return null;
    let temp = this.objects[index];
    this.objects[index] = this.objects[0];
    this.objects.shift();
    return temp;
  }

  static CleanupAllObjects() {
    let objects = ArrayTools.CloneArray(this.objects);
    for (let object of objects) {
      object.Destroy();
    }
  }

  static OnDisplayResized(oldSize) {
    let objects = ArrayTools.CloneArray(this.objects);
    for (let object of objects) {
      object.OnDisplayResized(oldSize);
    }
  }
}
