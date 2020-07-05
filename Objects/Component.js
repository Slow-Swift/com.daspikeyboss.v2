class Component {
  constructor(object, zOrder = 0.5) {
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
  Start() {}

  Update() {}

  LateUpdate() {}

  OnEnable() {}

  OnDisable() {}

  OnDestroy() {}

  OnCollisionEnter(other) {}

  OnCollision(other) {}

  OnCollisionExit(other) {}

  OnMouseOver() {}

  OnMouseExit() {}

  OnDisplayResized(oldSize) {}

//-------------//

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

  get active() {
    return this._active && this.object.active;
  }

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

  _RequireComponent(type, ...args) {
    if(this.object.FindComponentOfType(type) == null) {
      return new type(this.object, ...args);
    }
  }

  Destroy() {
    this._UnsubscribeFromUpdates();
    this.OnDestroy();
    this.object.RemoveComponent(this);
  }

  _SubscribeToUpdates() {
    Loop.Subscribe(this.bndUpdate, false, this.zOrder);
    Loop.Subscribe(this.bndLateUpdate, true, this.zOrder);
  }

  _UnsubscribeFromUpdates() {
    Loop.Unsubscribe(this.bndUpdate);
    Loop.Unsubscribe(this.bndLateUpdate, true);
  }
}
