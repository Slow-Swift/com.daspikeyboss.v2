/**
 * @class Object
 * 
 * @author daspikeyboss
 * 
 * @classdesc A GameObject setup with a transform that can have other components added.
 */

 //TODO: Change The class to be called GameObject (iss 1).

class Object {
  collisions = [];
  oldCollisions = [];
  components = [];
  isMouseOver = false;
  wasMouseOver = false;

  /**
   * @constructor
   * 
   * Creates a new Object and registers it with ObjectManagement.
   * 
   * @param {string} name The name of the Object.
   * @param {Vector2} position The position of the Object.
   * @param {number} rotation The rotation of the Object.
   * @param {Vector2} scale The scale of the Object.
   */
  constructor(name, position, rotation, scale) {
    this.name = name;
    this.tag = "";
    this.layer = "Default Layer";
    this.transform = new Transform2D(position, rotation, scale);
    this.transform.object = this;
    this.active = true;
    this.bndUpdate = this.Update.bind(this);
    this._SubAndUnsub();
    this.object = this;
    ObjectManagement.AddObject(this);
  }

  /**
   * Add [component] to the Object
   * 
   * @param {Component} component The componenet to be added to the Object.
   */
  AddComponent(component) {
    this.components.push(component);
  }

  /**
   * Remove [component] from the Object.
   * 
   * @param {Component} component The component to be removed from the Object.
   */
  RemoveComponent(component) {
    let index = this.components.indexOf(component);
    return ArrayTools.RemoveItem(this.components, index);
  }

  /**
   * Returns the component of type [type] if the Object has one attatched.
   * 
   * @param {Type} type The type of component that is needed.
   * 
   * @returns {Component | Null} the attatched component of type [type], null if there is no attatched 
   * component of that type.
   */
  FindComponentOfType(type) {
    for (let component of this.components) {
      if(component instanceof type) {
        return component;
      }
    }
    return null;
  }

  /**
   * Activates / Deactivates the Object bast on [active].
   * 
   * @param {boolean} active Should the Object be Activated (true) or Deactivated (false).
   */
  SetActive(active) {
    this.active = active;
    for (let component of this.components) {
      component.SetActiveByObject(active);
    }
    this._SubAndUnsub();
  }

  /**
   * Subscribes and Unsubrbes the Update method on the Object based on the Objects active state.
   */
  _SubAndUnsub() {
    if(this.active) {
      Loop.Subscribe(this.bndUpdate, false, 1.1);
    } else {
      Loop.Unsubscribe(this.bndUpdate);
    }
  }

  /**
   * Called every frame that the Object is active.
   */
  Update() {
    this.WorkCollisions();
  }

  /**
   * Check for collisions with other objects and call the related methods in all attatched Components.
   */
  WorkCollisions() {
    for (let collision of this.collisions) {
      if(!this.oldCollisions.includes(collision)) {
        let components = ArrayTools.CloneArray(this.components);
        for (let component of components) {
          if(component.active) {
            component.OnCollisionEnter(collision);
          }
        }
      }
      let components = ArrayTools.CloneArray(this.components);
      for (let component of components) {
        component.OnCollision(collision);
      }
    }

    for (let collision of this.oldCollisions) {
      if(!this.collisions.includes(collision)) {
        let components = ArrayTools.CloneArray(this.components);
        for (let component of components) {
          if(component.active) {
            component.OnCollisionExit(collision);
          }
        }
      }
    }

    let components = ArrayTools.CloneArray(this.components);
    for (let component of components) {
      if(this.isMouseOver && !this.wasMouseOver) {
        component.OnMouseOver();
      }
      if(!this.isMouseOver && this.wasMouseOver) {
        component.OnMouseExit();
      }
    }
    this.wasMouseOver = this.isMouseOver;
    this.oldCollisions = ArrayTools.CloneArray(this.collisions);
  }

  /**
   * Destroy the Game Object and remove it from the Scene.
   */
  Destroy() {
    this.SetActive(false);
    let components = ArrayTools.CloneArray(this.components);
    for (let component of components) {
      component.Destroy();
      this.RemoveComponent(component);
    }
    ObjectManagement.RemoveObject(this);
  }

  /**
   * When the screen is resized, call the related methods in all attatched components.
   * 
   * @param {Vector2} oldSize The size the screen used to be.
   */
  OnDisplayResized(oldSize) {
    let components = ArrayTools.CloneArray(this.components);
    for (let component of components) {
      component.OnDisplayResized(oldSize);
    }
  }
}
