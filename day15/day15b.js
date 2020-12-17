
let input = [0,3,6,0]
// let input = [1,2,3,0]
// let input = [2,1,3,0]
// let input = [2,3,1,0]
// let input = [3,2,1,0]
// let input = [3,1,2,0]
// let input = [16,12,1,0,15,7,11,0]

let spokenMap = new Map()

for(let i =0; i< input.length; i++) {
  spokenMap.set(input[i], {lastSpokenTurn: i+1, prevSpokenTurn: 0})
}

const checkRule = (lastSpoken, turn) => {
  const lastSpokenTurn = spokenMap.get(lastSpoken).lastSpokenTurn
  const prevSpoken = spokenMap.get(lastSpoken).prevSpokenTurn
  if(prevSpoken === lastSpokenTurn-1) {
    return 1
  }
  return (lastSpokenTurn-prevSpoken)
}

const runUntil2020 = () => {
  let turnCount = 4
  let lastSpoken = 0
  spokenMap.set(0, {lastSpokenTurn: turnCount, prevSpokenTurn: 1})
  while(turnCount <= 2020) {
    lastSpoken = checkRule(lastSpoken, turnCount+1)
    if(spokenMap.has(lastSpoken)) {
      const prevSpokenTurn = spokenMap.get(lastSpoken).lastSpokenTurn
      spokenMap.set(lastSpoken, {lastSpokenTurn: turnCount+1, prevSpokenTurn: prevSpokenTurn})
    } else {
      spokenMap.set(lastSpoken, {lastSpokenTurn: turnCount+1, prevSpokenTurn: 0})
      lastSpoken = 0
      turnCount++
      const prevSpokenTurn = spokenMap.get(lastSpoken).lastSpokenTurn
      spokenMap.set(lastSpoken, {lastSpokenTurn: turnCount+1, prevSpokenTurn: prevSpokenTurn})
    }

    turnCount++
  }
  let returnVal = 0
  spokenMap.forEach((val, key, oMap) => {
    if(val.lastSpokenTurn === 2020) {
      returnVal = key
      console.log("2020", key)
      return
    }
  })
  return returnVal
}

console.log(runUntil2020())