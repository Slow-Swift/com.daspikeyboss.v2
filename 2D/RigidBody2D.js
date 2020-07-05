class RigidBody2D extends Component{
  movementVector = Vector2.Zero;
  friction = 300;

  constructor(object) {
    super(object, 0);
  }

  Start() {
    this.collider = this.object.FindComponentOfType(Collider2D);
  }

  AddForce(force) {
    this.movementVector = this.movementVector.Add(force);
  }

  Update() {
    this.transform.position = this.transform.position.Add(
      this.movementVector.clone.MultiplyS(Time.deltaTime));
    if(this.movementVector.magnitude > this.friction * Time.deltaTime) {
      this.movementVector.magnitude -= this.friction * Time.deltaTime;
    } else {
      this.movementVector = Vector2.Zero;
    }
  }

  OnCollision(collision) {
    if(!collision.trigger) {
      this.movementVector = Vector2.Zero;
      let otherClosestPoint = collision.GetClosestEdgePoint(this.transform.position);
      let thisClosestPoint = this.collider.GetClosestEdgePoint(collision.transform.position);
      let relativePoint = thisClosestPoint.clone.Subtract(this.transform.position);
      this.transform.position = otherClosestPoint;
      this.transform.position = this.transform.position.Subtract(relativePoint);
    }
  }
}
