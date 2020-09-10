/**
 * @class Component
 * 
 * @author daspikeyboss
 * 
 * @classdesc The base class for components that can be added to Objects.
 */
class Component {

  /**
   * @constructor
   * 
   * @param {Object} object The object that the component will be attatched to. If missing a new Object will be created.
   * @param {number} zOrder The order for script execution. Higher zOrders get executed first.
   */
  constructor(object=null, zOrder = 0.5) {
    if(!(object instanceof Object)) {
      object = new Object(object, Vector2.Zero, 0, Vector2.One);
    }
    this.zOrder = zOrder;
    this.bndUpdate = this.Update.bind(this);
    this.bndLateUpdate = this.LateUpdate.bind(this);
    if(object != null) {
      this.AddToObject(object)
    } else {
      this.active = false;
    }
  }

  /**
   * Attatch this component to [object]
   * 
   * @param {Object} object The object to attatch this component to.
   */
  AddToObject(object) {
    object.AddComponent(this);
    this.object = object;
    this.transform = object.transform;
    this._active = true;

    this._SubscribeToUpdates();
    this.OnEnable();
    this.Start();
  }

//functions to be overriden by component
/**
 * Called when the component is first added to a GameObject.
 */
  Start() {}

  /**
   * Called each frame as long as the component is active.
   */
  Update() {}

  /**
   * Called each frame after Update().
   */
  LateUpdate() {}

  /**
   * Called when the Component is enabled.
   */
  OnEnable() {}

  /**
   * Called when the Component is disabled.
   */
  OnDisable() {}

  /**
   * Called when the component is detroyed.
   */
  OnDestroy() {}

  /**
   * Called when the Object first enters into a collision with another Object.
   * 
   * @param {Collider2D} other The collider that was hit.
   */
  OnCollisionEnter(other) {}

  /**
   * Called each frame that the Object is collided with another Object.
   * 
   * @param {Collider2D} other The collider that was hit.
   */
  OnCollision(other) {}

  /**
   * Called when the Object exits a collision with another Object.
   * 
   * @param {Collider2D} other The collider that was hit.
   */
  OnCollisionExit(other) {}

  /**
   * Called when the Mouse first collides with the Object.
   */
  OnMouseOver() {}

  /**
   * Called when the Mouse exits a collision with the Object.
   */
  OnMouseExit() {}

  /**
   * Called when the display changes size.
   * 
   * @param {Vector2} oldSize The size that the display used to be.
   */
  OnDisplayResized(oldSize) {}

//-------------//

/**
 * Activates / Deactivates the component based on [active].
 * 
 * @param {boolean} active Should the component be Activated (true) / Deactivate (false).
 */
  SetActive(active) {
    this.wasActive = this._active;
    this._active = active;
    if(active) {
      this._SubscribeToUpdates();
      if(!this.wasActive)
        this.OnEnable();
    } else {
      this._UnsubscribeFromUpdates();
      if(this.wasActive)
        this.OnDisable();
    }
  }

  /**
   * @returns whether the component is active or not.
   */
  get active() {
    return this._active && this.object.active;
  }

  //TODO: Decide what to do with SetActiveByObject().

  /**
   * Honestly Not Sure what this is.
   * 
   * @param {boolean} active 
   */
  SetActiveByObject(active) {
    if(active) {
      if(this._active) {
        this._SubscribeToUpdates();
        this.OnEnable();
      }
    } else {
      this._UnsubscribeFromUpdates();
      this.OnDisable();
    }
  }

  //TODO: See if there is a better way to do Require Component.

  /**
   * Make sure the Object has a component of type [type] attatched.
   * 
   * @param {Type} type The type of Component that is required.
   * @param  {...any} args The arguments that should be used if creating a new component is required.
   * 
   * @returns the new component that has been created if there was no component of the required type originally.
   *
   */
  _RequireComponent(type, ...args) {
    if(this.object.FindComponentOfType(type) == null) {
      return new type(this.object, ...args);
    }
  }

  /**
   * Destroy this component.
   */
  Destroy() {
    this._UnsubscribeFromUpdates();
    this.OnDestroy();
    this.object.RemoveComponent(this);
  }

  /**
   * Link the updates to main loop.
   */
  _SubscribeToUpdates() {
    Loop.Subscribe(this.bndUpdate, false, this.zOrder);
    Loop.Subscribe(this.bndLateUpdate, true, this.zOrder);
  }

  /**
   * Unlink the updates from main loop.
   */
  _UnsubscribeFromUpdates() {
    Loop.Unsubscribe(this.bndUpdate);
    Loop.Unsubscribe(this.bndLateUpdate, true);
  }
}
