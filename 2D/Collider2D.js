class Collider2D extends Component {
  trigger = false;

  constructor(object, trigger) {
    super(object, 1.2);
    this.trigger = trigger;
  }

  IsPointInside(point) {
    return false;
  }

  IsCollided(other) {
    return false;
  }

  GetClosestEdgePoint(other) {
    return Vector2.Zero;
  }

  Update() {
    let colliders = ObjectManagement.FindObjectsOfType(Collider2D);
    let collided = [];
    for (let collider of colliders) {
      if((collider.object != this.object) && this.IsCollided(collider)) {
        collided.push(collider);
      }
    }
    this.object.collisions = collided;
    this.object.isMouseOver = this.IsPointInside(Input.mousePosition);
  }
}
