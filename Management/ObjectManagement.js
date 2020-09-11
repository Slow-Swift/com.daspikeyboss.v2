/**
 * @class ObjectManagement
 * 
 * @author daspikeyboss
 * 
 * @classdesc Manages Objects in the Program.
 */
class ObjectManagement {

  /**
   * All the Objects currently in the Program
   */
  static objects = [];

  /**
   * Find an Object called [name].
   * 
   * @param {string} name The name of the Object.
   * @param {boolean} active Only search for active objects?
   * 
   * @returns {Object} The Object that was found.
   */
  static FindObjectByName(name, active=true) {
    for (let object of this.objects) {
      if(object.name == name && (!active || object.active)) {
        return object;
      }
    }
  }

  /**
   * Find all Objects called [name].
   * 
   * @param {string} name The name of the Objects.
   * @param {boolean} active Only search for active objects?
   * 
   * @returns {Array} A list of the Objects that were found.
   */
  static FindObjectsByName(name, active=true) {
    let objects = [];
    for (let object of this.objects) {
      if(object.name == name && (!active || object.active)) {
        objects.push(object);
      }
    }
    return objects;
  }

  /**
   * Find an Object tagged with [tag].
   * 
   * @param {string} tag The tag of the Object.
   * @param {boolean} active Only search for active objects?
   * 
   * @returns {Object} The Object that was found.
   */
  static FindObjectByTag(tag, active=true) {
    for (let object of this.objects) {
      if(object.tag == tag && (!active || object.active)) {
        return object;
      }
    }
  }

  /**
   * Find all Objects tagged with [tag].
   * 
   * @param {string} tag The tag of the Objects.
   * @param {boolean} active Only search for active objects?
   * 
   * @returns {Array} A list of the Objects that were found.
   */
  static FindObjectsByTag(tag, active=true) {
    let objects = [];
    for (let object of this.objects) {
      if(object.tag == tag && (!active || object.active)) {
        objects.push(object);
      }
    }
    return objects;
  }


  /**
   * Find a Component of type [type].
   * 
   * @param {Type} type The type of component that is being searched for
   * @param {boolean} active Only search for active objects?
   * 
   * @returns {Component} The Component that was found.
   */
  static FindObjectOfType(type, active=true) {
    for (let object of this.objects) {
      let comp = object.FindComponentOfType(type);
      if(comp != null && (!active || comp.active)) {
        return comp;
      }
    }
  }


  /**
   * Find all Components of type [type].
   * 
   * @param {Type} type The type of component that is being searched for
   * @param {boolean} active Only search for active objects?
   * 
   * @returns {Component} A list of the Components that were found.
   */
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

  /**
   * Tell ObjectManagement to start managing [object].
   * 
   * @param {Object} object The Object to begin managing.
   */
  static AddObject(object) {
    this.objects.push(object);
  }

  /**
   * Stop ObjectManagment from managing [object].
   * 
   * @param {Object} object The object to stop managing.
   * 
   * @returns {Object | null} The object that was removed. Null if the object was not being managed.
   */
  static RemoveObject(object) {
    let index = this.objects.indexOf(object);
    if(index < 0)
      return null;
    let temp = this.objects[index];
    this.objects[index] = this.objects[0];
    this.objects.shift();
    return temp;
  }

  /**
   * Destroy all Objects.
   */
  static CleanupAllObjects() {
    let objects = ArrayTools.CloneArray(this.objects);
    for (let object of objects) {
      object.Destroy();
    }
  }

  /**
   * Notify all objects that the display has been resized.
   * 
   * @param {Vector2} oldSize The size the display used to be.
   */
  static OnDisplayResized(oldSize) {
    let objects = ArrayTools.CloneArray(this.objects);
    for (let object of objects) {
      object.OnDisplayResized(oldSize);
    }
  }
}
