const fs = require('fs')
 
var contents = fs.readFileSync('./day17/input.txt', 'utf8');
// example parse
const input = contents.split(/\n/).map(val => val.split(''))
console.log(input)
//active #
//inactive .
// baseCubeState = {x, y, z, active}

const getActiveNeighbors = (cubeStates, xVal, yVal, zVal, wVal) => {
  let activeCount = 0
  let inactiveCount = 0
  for(let i = xVal-1; i <= xVal+1; i++) {
    for(let j = yVal-1; j <= yVal+1; j++) {
      for(let k = zVal-1; k <= zVal+1; k++) {
        for(let m = wVal-1; m <= wVal+1; m++) {
          if(cubeStates?.[m]?.[k]?.[j]?.[i]) {
              if(i !== xVal || j!==yVal || k!==zVal || m !== wVal) {
                activeCount++ 
              }
          } else {
            inactiveCount++
          }
        }
      }
    }
  }
  return activeCount;
}

const activity = (cubeStates) => {
  // subtract and add to x, y and z
  // a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active
  // a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active
  // create a copy since all the objects change at once
  let csCopy = JSON.parse(JSON.stringify(cubeStates))
  // loop through and determine all 
  let currentActive = 0

  for(let e= 0; e < cubeStates.length; e++) {
    for(let i = 0; i < cubeStates.length; i++) {
      for(let j = 0; j < cubeStates[0][0].length; j++) {
        for(let k = 0; k < cubeStates[0][0].length; k++) {
          const neighborsActive = getActiveNeighbors(csCopy, k, j, i, e)
          if(cubeStates?.[e]?.[i]?.[j]?.[k]) {
            if(neighborsActive === 3 || neighborsActive === 2) {
              cubeStates[e][i][j][k] = true
              currentActive++
            }
            else {
              cubeStates[e][i][j][k] = false
            }
          } else {
            if(neighborsActive === 3) {
              cubeStates[e][i][j][k] = true
              currentActive++
            }
            else {
              cubeStates[e][i][j][k] = false
            }
          }
        }
      }
    }
  }
    // determine all cubes around this ones state
  return cubeStates
}

const increaseZVal = (cubeStates, zVal) => {
  // create empty grid sizes
  let emptyRow
  const initLength = cubeStates[0].length
  let wCube = []
  if(zVal === 1) {
    for(let j=0; j< initLength; j++) {
      for(let i =0; i< initLength; i++) {
        cubeStates[j][i].push(false)
        cubeStates[j][i].unshift(false)
      }
      emptyRow = JSON.parse(JSON.stringify(cubeStates[0][0])).map(val => false)
      cubeStates[j].unshift(emptyRow)
      cubeStates[j].push(emptyRow)
    }
    // make an empty cube
    const emptyZ = JSON.parse(JSON.stringify(cubeStates[0]))
    let emptyCube = []

    for(let i = 0; i < input[0].length; i++) {
      emptyCube.push(emptyZ)
    }
    wCube.push(emptyCube)
    wCube.push(cubeStates)
    wCube.push(emptyCube)
  }
  else {
    const zwLength = cubeStates.length
    const xyLength = cubeStates[0][0][0].length
    for(let k = 0; k < zwLength; k++) {
      for(let j=0; j < initLength; j++) {
        for(let i = 0; i< xyLength; i++) {
          // add in the empty rows
          console.log(k, j, i)
          cubeStates[k][j][i].push(false)
          cubeStates[k][j][i].unshift(false)
        }
      }
      // create an empty cube copy
    }
    emptyRow = JSON.parse(JSON.stringify(cubeStates[0][0][0])).map(val => false)
    for(let k = 0; k< zwLength; k++) {
      for(let n = 0; n < initLength; n++) {
        // add the empty z coordinates
        console.log(n)
        cubeStates[k][n].unshift(emptyRow)
        cubeStates[k][n].push(emptyRow)
      }
    }
    // make an empty cube
    let emptyZCube = []
    let emptyXYCube = []
    for(let j=0; j< xyLength+2; j++) {
      emptyXYCube.push(emptyRow)
    }

    // append these to all of the z cubes
    for(let k = 0; k< zwLength; k++) {
      cubeStates[k].unshift(emptyXYCube)
      cubeStates[k].push(emptyXYCube)
    }
    for(let j=0; j< initLength+2; j++) {
      emptyZCube.push(emptyXYCube)
    }
    // append to all of the w cubes
    for(let i = 0; i < cubeStates.length; i++) {
      wCube.push(cubeStates[i])
    }
    wCube.unshift(emptyZCube)
    wCube.push(emptyZCube)
    }
  return wCube
}

// use 2 d array mantianing z state
const setInitStates = () => {
  // Create 2 D array of dimmensions
  let xyCube = new Array(input[0].length)
  // dimmension array
  let cubeStates = new Array(1)
  for(let i = 0; i < input[0].length; i++) {
    xyCube[i] = new Array(input[0].length)
    cubeStates[i] = xyCube
  }
  cubeCopy = JSON.parse(JSON.stringify(cubeStates))
  for(let i = 0; i < input[0].length; i++) {
    for(let j = 0; j < input[0].length; j++) {
      let active = input[i][j]==='#' ? true : false
      // xyCube[j][i] = active
      // if(i === 1) {
        cubeCopy[1][i][j] = active
      // }
    }
  }
  return cubeCopy;
}

const runCycle = () => {
  let cubeStates = setInitStates()
  for(let i = 1; i <= 6; i++) {
    cubeStates = JSON.parse(JSON.stringify(increaseZVal(cubeStates, i)))
    console.log("Cycle number", i)
    cubeStates = JSON.parse(JSON.stringify(activity(cubeStates)))
  }

  let totalActive = 0
  cubeStates.forEach(element => {
    element.forEach(val => {
      val.forEach(pos => {
        pos.forEach(xy => {
        if(xy) totalActive++
        })
      })
    })
  });
  return totalActive
}

console.log(runCycle())
 