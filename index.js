const DIRECTION_DOWN = -1;
const DIRECTION_NONE = 0;
const DIRECTION_UP = 1;

function HardwareElevator(floors, currenFloor) {
  this.floors = floors;
  this.currenFloor = currenFloor;
  this.direction = DIRECTION_NONE;
}

HardwareElevator.prototype = {
  move: function (floor) {
    if (floor >= 0 && floor <= this.floors) {
      console.log(`going to ${floor} floor`);
      while (this.currenFloor !== floor) {
        if (this.currenFloor < floor) {
          this.moveUp();
        } else {
          this.moveDown();
        }
      }
      this.stopAndOpenDoors();
    } else {
      console.log(`highest floor is ${this.floors}, lowest floor is 0`);
    }
  },
  moveUp: function () {
    this.direction = DIRECTION_UP;
    this.currenFloor += DIRECTION_UP;
    console.log(
      `direction ${this.direction} current floor is ${this.currenFloor}`
    );
  },
  moveDown: function () {
    this.direction = DIRECTION_DOWN;
    this.currenFloor += DIRECTION_DOWN;
    console.log(
      `direction ${this.direction} current floor is ${this.currenFloor}`
    );
  },
  stopAndOpenDoors: function () {
    this.direction = DIRECTION_NONE;
    console.log(this.getCurrentDirection());
    console.log(this.getCurrentFloor());
    console.log("stop and open");
  },
  getCurrentFloor: function () {
    return `current floor is ${this.currenFloor}`;
  },
  getCurrentDirection: function () {
    return `current direction is ${this.direction}`;
  },
};

function Elevator(floors, currenFloor) {
  this.hw = new HardwareElevator(floors, currenFloor);
}

Elevator.prototype = {
  onDoorsClosed: function () {
    console.log("doors closed");
  },
  onBeforeFloor: function () {
    return this.hw.getCurrentFloor();
  },
  onFloorButtonPressed: function (floor, direction) {
    if (this.hw.direction === 0 || this.hw.direction === direction) {
      this.hw.move(floor);
    }
  },
  onCabinButtonPressed: function (floor) {
    this.hw.move(floor);
    this.onDoorsClosed();
  },
};

let el = new Elevator(25, 0);
el.onFloorButtonPressed(6, -1);
el.onCabinButtonPressed(25);
