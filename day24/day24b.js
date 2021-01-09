const fs = require('fs')

// var contents = fs.readFileSync('./day24/testinput.txt', 'utf8');
var contents = fs.readFileSync('./day24/input.txt', 'utf8');
// example parse
const input = contents.split(/\n/)
// directions e, se, sw, w, nw, and ne

// create map of the movements
// when storing values in the map subtract opposites then store the final postions
let tileMap = new Map()
let directionSet = new Set(["e", "se", "sw", "w", "nw", "ne"])
const findTilePosition = (directions) => {
  // let tilePos = {"e":0, "se":0, "sw":0, "w":0, "nw":0, "ne":0}
  let tilePos = {"e":0, "s":0, "n":0, "w":0}
  while(directions.length !== 0) {
    let nextMove = directions.slice(0,2)
    if(directionSet.has(nextMove) && nextMove.length > 1) {
      tilePos[nextMove[0]]+=1
      tilePos[nextMove[1]]+=1
      // tilePos[nextMove]++
      directions = directions.slice(2)
    } else {
      nextMove = directions.slice(0,1)
      tilePos[nextMove]+=2
      directions = directions.slice(1)
    }
  }
  // e and w are opposites
  if(tilePos['e'] > tilePos['w']) {
    tilePos['e'] = tilePos['e'] - tilePos['w']
    tilePos['w'] = 0
  } else {
    tilePos['w'] = tilePos['w'] - tilePos['e']
    tilePos['e'] = 0
  }
  if(tilePos['n'] > tilePos['s']) {
    tilePos['n'] = tilePos['n'] - tilePos['s']
    tilePos['s'] = 0
  } else {
    tilePos['s'] = tilePos['s'] - tilePos['n']
    tilePos['n'] = 0
  }
  
  return tilePos
}

const flipTiles = (line) => {
  const tile = JSON.stringify(findTilePosition(line))
  // store tile in the 
  if(tileMap.has(tile)) {
    tileMap.set(tile, false)
  } else {
    tileMap.set(tile, true)
  }
}

const setTiles = () => {
  input.forEach(line => {
    flipTiles(line)
  })
}
setTiles()

let copyMap = new Map()
const findBlackTiles = () => {
  let totalBlack = 0
  tileMap.forEach((black, tile, map) => {
    if(black) {
      totalBlack++
    //   copyMap.set(tile, true)
    // }
    // else {
      tile = JSON.parse(tile)
      let tilePosE = JSON.stringify(findTruePosition({"e":tile["e"]+2, "s":tile["s"], "n":tile["n"], "w":tile["w"]}))
      let tilePosSE = JSON.stringify(findTruePosition({"e":tile["e"]+1, "s":tile["s"]+1, "n":tile["n"], "w":tile["w"]}))
      let tilePosSW = JSON.stringify(findTruePosition({"e":tile["e"], "s":tile["s"]+1, "n":tile["n"], "w":tile["w"]+1}))
      let tilePosW = JSON.stringify(findTruePosition({"e":tile["e"], "s":tile["s"], "n":tile["n"], "w":tile["w"]+2}))
      let tilePosNW = JSON.stringify(findTruePosition({"e":tile["e"], "s":tile["s"], "n":tile["n"]+1, "w":tile["w"]+1}))
      let tilePosNE = JSON.stringify(findTruePosition({"e":tile["e"]+1, "s":tile["s"], "n":tile["n"]+1, "w":tile["w"]}))
    
      // determine the neighbors positions add/sub 2 e w and 1 in n s 
      if(tileMap.get(tilePosE)) black++
      else {
        if (!tileMap.has(tilePosE)) tileMap.set(tilePosE, false)
      }
      if(tileMap.get(tilePosSE)) black++
      else {
        if (!tileMap.has(tilePosSE)) tileMap.set(tilePosSE, false)
      }
      if(tileMap.get(tilePosSW)) black++
      else {
        if (!tileMap.has(tilePosSW)) tileMap.set(tilePosSW, false)
      }
      if(tileMap.get(tilePosW)) black++
      else {
        if (!tileMap.has(tilePosW)) tileMap.set(tilePosW, false)
      }
      if(tileMap.get(tilePosNW)) black++
      else {
        if (!tileMap.has(tilePosNW)) tileMap.set(tilePosNW, false)
      }
      if(tileMap.get(tilePosNE)) black++
      else {
        if (!tileMap.has(tilePosNE)) tileMap.set(tilePosNE, false)
      }
    }
  })
  return totalBlack
}

const findTruePosition = (tilePos) => {
  if(tilePos['e'] > tilePos['w']) {
    tilePos['e'] = tilePos['e'] - tilePos['w']
    tilePos['w'] = 0
  } else {
    tilePos['w'] = tilePos['w'] - tilePos['e']
    tilePos['e'] = 0
  }
  if(tilePos['n'] > tilePos['s']) {
    tilePos['n'] = tilePos['n'] - tilePos['s']
    tilePos['s'] = 0
  } else {
    tilePos['s'] = tilePos['s'] - tilePos['n']
    tilePos['n'] = 0
  }
  
  return tilePos
}
// Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
// Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
// all tiles are initially white
const setColor = (tilePos, isBlack) => {
  let blackCount = 0
  let tile = JSON.parse(tilePos)
  let tilePosE = JSON.stringify(findTruePosition({"e":tile["e"]+2, "s":tile["s"], "n":tile["n"], "w":tile["w"]}))
  let tilePosSE = JSON.stringify(findTruePosition({"e":tile["e"]+1, "s":tile["s"]+1, "n":tile["n"], "w":tile["w"]}))
  let tilePosSW = JSON.stringify(findTruePosition({"e":tile["e"], "s":tile["s"]+1, "n":tile["n"], "w":tile["w"]+1}))
  let tilePosW = JSON.stringify(findTruePosition({"e":tile["e"], "s":tile["s"], "n":tile["n"], "w":tile["w"]+2}))
  let tilePosNW = JSON.stringify(findTruePosition({"e":tile["e"], "s":tile["s"], "n":tile["n"]+1, "w":tile["w"]+1}))
  let tilePosNE = JSON.stringify(findTruePosition({"e":tile["e"]+1, "s":tile["s"], "n":tile["n"]+1, "w":tile["w"]}))

  // determine the neighbors positions add/sub 2 e w and 1 in n s 
  if(tileMap.get(tilePosE)) blackCount++
  else {
    if (!copyMap.has(tilePosE)) copyMap.set(tilePosE, false)
  }
  if(tileMap.get(tilePosSE)) blackCount++
  else {
    if (!copyMap.has(tilePosSE)) copyMap.set(tilePosSE, false)
  }
  if(tileMap.get(tilePosSW)) blackCount++
  else {
    if (!copyMap.has(tilePosSW)) copyMap.set(tilePosSW, false)
  }
  if(tileMap.get(tilePosW)) blackCount++
  else {
    if (!copyMap.has(tilePosW)) copyMap.set(tilePosW, false)
  }
  if(tileMap.get(tilePosNW)) blackCount++
  else {
    if (!copyMap.has(tilePosNW)) copyMap.set(tilePosNW, false)
  }
  if(tileMap.get(tilePosNE)) blackCount++
  else {
    if (!copyMap.has(tilePosNE)) copyMap.set(tilePosNE, false)
  }
  // tileMap.get(tilePosE) ? blackCount++ : copyMap.set(tilePosE, false)
  // tileMap.get(tilePosSE) ? blackCount++ : copyMap.set(tilePosSE, false)
  // tileMap.get(tilePosSW) ? blackCount++ : copyMap.set(tilePosSW, false)
  // tileMap.get(tilePosW) ? blackCount++ : copyMap.set(tilePosW, false)
  // tileMap.get(tilePosNW) ? blackCount++ : copyMap.set(tilePosNW, false)
  // tileMap.get(tilePosNE) ? blackCount++ : copyMap.set(tilePosNE, false)


  // tileMap.get(tilePosE) ? blackCount++ : tileMap.set(tilePosE, false)
  // tileMap.get(tilePosSE) ? blackCount++ : tileMap.set(tilePosSE, false)
  // tileMap.get(tilePosSW) ? blackCount++ : tileMap.set(tilePosSW, false)
  // tileMap.get(tilePosW) ? blackCount++ : tileMap.set(tilePosW, false)
  // tileMap.get(tilePosNW) ? blackCount++ : tileMap.set(tilePosNW, false)
  // tileMap.get(tilePosNE) ? blackCount++ : tileMap.set(tilePosNE, false)

  // true is black
  let returnedColor = isBlack
  if(isBlack){
    if(blackCount === 0 || blackCount > 2) {
      returnedColor = false
    }
  }
  else if(blackCount==2) {
    returnedColor = true
  }
  return returnedColor
}

const groupFlip = () => {
  copyMap = new Map()
  let totalBlack = 0
  tileMap.forEach((black, tile, map) => {
    const color = setColor(tile, black)
    if(color) {
      totalBlack++
    }
    copyMap.set(tile, color)
  })
  // console.log(totalBlack)
  return copyMap
}

const flipNTimes = () => {
  for(let i = 1; i<=100; i++) {
    tileMap = groupFlip()
  }
  return findBlackTiles()
}

console.log("Total black first run", findBlackTiles())
console.log(flipNTimes())