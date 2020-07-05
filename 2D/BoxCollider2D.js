//// NOTE: Does Not Rotate
// NOTE: Colliders need a Lot Of Work! This means they are very easy
// to mess up on while using. For example they only collide with other
// BoxCollider2Ds.
class BoxCollider2D extends Collider2D {
  constructor(object, width, height, ...args) {
    super(object, ...args);
    this.width = width;
    this.height = height;
  }

  GetClosestEdgePoint(other) {
    let toOtherPoint = this.transform.position.clone.Subtract(other);
    let widthPercent = toOtherPoint.x / this.width / 2;
    let heightPercent = toOtherPoint.y / this.height / 2;
    let nearestPoint = Vector2.Zero;
    if(Math.abs(widthPercent) > Math.abs(heightPercent)) {
      nearestPoint = toOtherPoint.DivideS(widthPercent);
    } else {
      nearestPoint = toOtherPoint.DivideS(heightPercent);
    }
    return nearestPoint.Add(this.transform.position);
  }

  IsPointInside(point) {
    let halfWidth = this.width / 2 * this.transform.scale.x;
    let halfHeight = this.height / 2 * this.transform.scale.y;
    let tx = this.transform.position.x;
    let ty = this.transform.position.y
    if(point.x > tx - halfWidth && point.x < tx + halfWidth) {
      if(point.y > ty - halfHeight && point.y < ty + halfHeight) {
        return true;
      }
    }
    return false;
  }

  IsCollided(other) {
    if(!(other instanceof BoxCollider2D)) {
      return false;
    }

    let lbnd = this.transform.position.x - this.width / 2 * this.transform.scale.x;
    let rbnd = this.transform.position.x + this.width / 2 * this.transform.scale.x;
    let ubnd = this.transform.position.y + this.height / 2 * this.transform.scale.y;
    let dbnd = this.transform.position.y - this.height / 2 * this.transform.scale.y;
    let olbnd = other.transform.position.x - other.width / 2 * other.transform.scale.x;
    let orbnd = other.transform.position.x + other.width / 2 * other.transform.scale.x;
    let oubnd = other.transform.position.y + other.height / 2 * other.transform.scale.y;
    let odbnd = other.transform.position.y - other.height / 2 * other.transform.scale.y;

    if(rbnd > olbnd && lbnd < orbnd) {
      if(ubnd > odbnd && dbnd < oubnd) {
        return true;
      }
    }
    return false;
  }

  GetClosestEdgePoint(other) {

  }
}
