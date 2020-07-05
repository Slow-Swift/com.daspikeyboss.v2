class Object {
  collisions = [];
  oldCollisions = [];
  components = [];
  isMouseOver = false;
  wasMouseOver = false;

  constructor(name, position, rotation, scale) {
    this.name = name;
    this.tag = "";
    this.layer = "Default Layer";
    this.transform = new Transform2D(position, rotation, scale);
    this.transform.object = this;
    this.active = true;
    this.bndUpdate = this.Update.bind(this);
    this.SubAndUnsub();
    this.object = this;
    ObjectManagement.AddObject(this);
  }

  AddComponent(component) {
    this.components.push(component);
  }

  RemoveComponent(component) {
    let index = this.components.indexOf(component);
    return ArrayTools.RemoveItem(this.components, index);
  }

  FindComponentOfType(type) {
    for (let component of this.components) {
      if(component instanceof type) {
        return component;
      }
    }
    return null;
  }

  SetActive(active) {
    this.active = active;
    for (let component of this.components) {
      component.SetActiveByObject(active);
    }
    this.SubAndUnsub();
  }

  SubAndUnsub() {
    if(this.active) {
      Loop.Subscribe(this.bndUpdate, false, 1.1);
    } else {
      Loop.Unsubscribe(this.bndUpdate);
    }
  }

  Update() {
    this.WorkCollisions();
  }

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

  Destroy() {
    this.SetActive(false);
    let components = ArrayTools.CloneArray(this.components);
    for (let component of components) {
      component.Destroy();
      this.RemoveComponent(component);
    }
    ObjectManagement.RemoveObject(this);
  }

  OnDisplayResized(oldSize) {
    let components = ArrayTools.CloneArray(this.components);
    for (let component of components) {
      component.OnDisplayResized(oldSize);
    }
  }
}
