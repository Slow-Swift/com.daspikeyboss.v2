// NOTE: CircleCollider scales with the X component of the transforms scale Vector2
//// NOTE: Does Not Rotate
// NOTE: Colliders need a Lot Of Work! This means they are very easy
// to mess up on while using. For example they only collide with other
// BoxCollider2Ds.

class CircleCollider extends Collider2D {
  constructor(object, radius, ...args) {
    super(object, ...args);
    this.radius = radius;
  }

  IsPointInside(point) {
    let p = Vector2.Subtract(point, this.transform.position);
    return p.magnitude <= this.radius * this.transform.scale.x;
  }

  IsCollided(other) {
    if(!(other instanceof this.constructor))
      return;

    let toOtherVector = Vector2.Subtract(other.transform.position, this.transform.position);
    let totalRadius = this.radius * this.transform.scale.x +
      other.radius * other.transform.scale.x;
    let collided = toOtherVector.magnitude < totalRadius;
    return collided;
  }

  GetClosestEdgePoint(other) {
    let toOtherPoint = other.clone.Subtract(this.transform.position);
    toOtherPoint.magnitude = this.radius * this.transform.scale.x;
    return toOtherPoint.Add(this.transform.position);
  }
}
