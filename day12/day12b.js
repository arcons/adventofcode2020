const fs = require('fs')

var contents = fs.readFileSync('./day12/input.txt', 'utf8');
const input = contents.split('\n').map(str => 
  {return {direction: str[0], units: parseInt(str.slice(1))}})

// Action N means to move north by the given value.
// Action S means to move south by the given value.
// Action E means to move east by the given value.
// Action W means to move west by the given value.
// Action L means to turn left the given number of degrees.
// Action R means to turn right the given number of degrees.
// Action F means to move forward by the given value in the direction the ship is currently facing.

let directionToDegreeMap = new Map()
directionToDegreeMap.set('N', 90)
directionToDegreeMap.set('S', 270)
directionToDegreeMap.set('E', 0)
directionToDegreeMap.set('W', 180)

let degreeToDirectionMap = new Map()
degreeToDirectionMap.set(90, 'N')
degreeToDirectionMap.set(270, 'S')
degreeToDirectionMap.set(0, 'E')
degreeToDirectionMap.set(180, 'W')

let shipPosition = {x: 0, y: 0, waypoint: {x:10, y:1}}

const getDegreeToDirection = (direction, degrees) => {
  if(direction == 'L') {
  }
  else if(direction == 'R') {
    degrees *= -1
  }
  let currentDir = (360+ degrees)%360
  let curretWaypoint = JSON.parse(JSON.stringify(shipPosition.waypoint))
  switch (currentDir) {
    // N second quadrant
    case 90:
      shipPosition.waypoint.x = curretWaypoint.y * -1
      shipPosition.waypoint.y = curretWaypoint.x
      break;
    // S fourth quadrant
    case 270:
      shipPosition.waypoint.x = curretWaypoint.y
      shipPosition.waypoint.y = curretWaypoint.x * -1
      break;
    // Don't turn if its 0 degrees
    case 0: // 
      // shipPosition.waypoint.x = curretWaypoint.y
      // shipPosition.waypoint.y = curretWaypoint.x
      break;
    // W third quadrant
    case 180:
      shipPosition.waypoint.x = curretWaypoint.x * -1
      shipPosition.waypoint.y = curretWaypoint.y * -1
      break;
  }
  // shipPosition.direction = degreeToDirectionMap.get(currentDir)
}

// 93265 too high
// 6210 too low
const incrementPosition = (direction, value) => {
  switch (direction) {
    case "N":
      shipPosition.waypoint.y += value
      break;
    case "S":
      shipPosition.waypoint.y -= value
      break;
    case "E":
      shipPosition.waypoint.x += value
      break;
    case "W":
      shipPosition.waypoint.x -= value
      break;
    case "F":
      for(let i = 0; i < value; i++) {
        shipPosition.x += shipPosition.waypoint.x
        shipPosition.y += shipPosition.waypoint.y
      }
      break;
    default:
      getDegreeToDirection(direction, value)
      break;
  }
}

const getMD = (input) => {
  for(let i = 0; i<input.length; i++) {
    console.log(shipPosition.waypoint)
    incrementPosition(input[i].direction, input[i].units)
  }
  return Math.abs(shipPosition.x) + Math.abs(shipPosition.y)
}

console.log(getMD(input))