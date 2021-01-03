let input = 219748365

const runMove = (current, pos) => {
  const originalOrder = JSON.parse(JSON.stringify(current))
  current.unshift(...originalOrder)
  const cupSlice = current.slice(pos+1, pos+4)
  current.splice((pos+1), 3)
  let dest = current[pos]-1
  while(cupSlice.includes(dest)) {
    dest-=1
  }
  if(dest <= 0) {
    const notPickedUp = JSON.parse(JSON.stringify(originalOrder))
    dest = notPickedUp.filter(item => !cupSlice.includes(item)).sort()[5]
  }
  current.splice(0, pos)
  current.splice(current.indexOf(dest)+1, 0, ...cupSlice)
  current.length = 9
  console.log("Current", current)
  return current
}

const run100 = () => {
  let finalVal = input.toString().split('').map(val => parseInt(val))
  finalVal = runMove(finalVal, 0)
  for(let i = 0; i<99; i++) {
    console.log("Run number", i)
    finalVal = runMove(finalVal, 1)
  }
  return finalVal.join();
}

console.log(run100())