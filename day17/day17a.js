const fs = require('fs')
 
var contents = fs.readFileSync('./day17/testinput.txt', 'utf8');
// example parse
const input = contents.split(/\n/).map(val => val.split(''))
console.log(input)
//active #
//inactive .
// baseCubeState = {x, y, z, active}

const getActiveNeighbors = (cubeStates, xVal, yVal, zVal) => {
  let activeCount = 0
  let inactiveCount = 0
  console.log(xVal,yVal,zVal)
  if(zVal===1) {
    console.log('z = 1')
  }
  if(zVal===-1) {
    console.log('z = -1')
  }
  for(let i = xVal-1; i <= xVal+1; i++) {
    for(let j = yVal-1; j <= yVal+1; j++) {
      for(let k = zVal-1; k <= zVal+1; k++) {
        let currentVal = JSON.stringify({x: i, y: j, z: k})
        // check if the current index exists
        // don't count current position
        if(cubeStates.has(currentVal)) {
            // cubeStates.get(currentVal) ? activeCount++ : inactiveCount++
            // this returns active or not
            if(cubeStates.get(currentVal)) {
              activeCount++ 
            } else if(currentVal !== JSON.stringify({x: xVal, y:yVal, z:zVal})) inactiveCount++
        } else {
          inactiveCount++
        }
      console.log(currentVal)
      console.log(`Inactive ${inactiveCount}, Active ${activeCount}`)
      }
    }
  }
  // }
  // console.log(x, y, z)
  // console.log(activeCount)
  // if(zVal===0 && yVal ===0 && xVal==0) {
  //   console.log(1,1,1)
  // }
  if(activeCount!== 0) {
    console.log("Active count", activeCount)
  }
  return activeCount;
}

const activity = (cubeStates) => {
  // subtract and add to x, y and z
  // a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active
  // a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active
  // create a copy since all the objects change at once
  let csCopy = new Map(cubeStates)
  // loop through and determine all 
    let currentActive = 0

  csCopy.forEach((active, cube, cubeStates) => {
    // determine all cubes around this ones state
    const { x, y, z } = JSON.parse(cube)
    const neighborsActive = getActiveNeighbors(csCopy, x, y, z, active)
    if(active) {
      if(neighborsActive === 3 || neighborsActive === 2) {
        cubeStates.set(cube, true)
        currentActive++
      }
      else {
        cubeStates.set(cube, false)
      }
    } else {
      if(neighborsActive === 3) {
        cubeStates.set(cube, true)
        currentActive++
      }
      else {
        cubeStates.set(cube, false)
      }
    }
  });
  return cubeStates
}

const increaseZVal = (cubeStates, zVal, xyVal) => {
  let csCopy = new Map(cubeStates)
  cubeStates.forEach((active, coordindate, cMap) => {
    let {x,y,z} = JSON.parse(coordindate)
    csCopy.set(JSON.stringify({x,y,z:0-zVal}), false)
    csCopy.set(JSON.stringify({x,y,z:0+zVal}), false)
    csCopy.set(JSON.stringify({x:0-(xyVal-1),y:0-(xyVal-1),z:0-zVal}), false)
    csCopy.set(JSON.stringify({x:0+(xyVal-1),y:0+(xyVal-1),z:0+zVal}), false)
    csCopy.set(JSON.stringify({x:0+(xyVal-1),y:0-(xyVal-1),z:0-zVal}), false)
    csCopy.set(JSON.stringify({x:0-(xyVal-1),y:0+(xyVal-1),z:0+zVal}), false)
  })
  // do this twice for ease of parsing map

  return csCopy
}

const setInitStates = () => {
  let cubeStates = new Map()
  let z = 0
  for(let i = 0; i < input[0].length; i++) {
    for(let j = 0; j < input[0].length; j++) {
      let active = input[i][j]==='#' ? true : false
      cubeStates.set(JSON.stringify({x: j, y: i, z:0}), active)
      cubeStates.set(JSON.stringify({x: 0-j, y: i, z:0}), active)
      cubeStates.set(JSON.stringify({x: j, y: 0-i, z:0}), active)
    }
  }
  return cubeStates;
}

const runCycle = () => {
  let cubeStates = new Map(setInitStates())
  for(let i = 1; i <= 6; i++) {
    cubeStates = new Map(increaseZVal(cubeStates, i, input[0].length+i))
    cubeStates = new Map(activity(cubeStates))
  }

  let totalActive = 0
  cubeStates.forEach(element => {
    if(element) {
      totalActive++
    }
  });
  return totalActive
}

console.log(runCycle())
