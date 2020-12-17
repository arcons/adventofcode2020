
let input = [0,3,6]
// let input = [2,1,3]
// let input = [1,2,3]
// let input = [2,3,1]
// let input = [3,2,1]
// let input = [3,1,2]
// let input = [16,12,1,0,15,7,11]

const checkRule = (lastSpoken, turn) => {
  const lastSpokenIndex = input.lastIndexOf(lastSpoken)
  if(input[turn-2] === input[turn-3]) {
    return 1
  }
  input.splice(lastSpokenIndex, 1);
  const prevSpoken = input.lastIndexOf(lastSpoken)
  input.splice(lastSpokenIndex, 0, lastSpoken);
  return (lastSpokenIndex-prevSpoken)
}

const runUntil2020 = () => {
  let turnCount = 5
  input.push(0)
  let lastSpoken = input[input.length-1]
  while(turnCount <= 2020) {
    lastSpoken = checkRule(lastSpoken, turnCount)
    if(input.includes(lastSpoken)) {
      input.push(lastSpoken)
    } else {
      input.push(lastSpoken)
      input.push(0)
      lastSpoken = 0
      turnCount++
    }
    // if(input.includes(lastSpoken)) {
      // const lastSpokenIndex = input.indexOf(lastSpoken)
      // input.splice(lastSpokenIndex, 1);
    // }

    turnCount++
  }
  console.log(input[2019])
  return input[2019]
}

console.log(runUntil2020())