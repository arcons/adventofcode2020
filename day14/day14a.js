const fs = require('fs')

var contents = fs.readFileSync('./day14/input.txt', 'utf8');
const input = contents.split("\n").map(str => str.split(" = "))

input.forEach(mask => {
  if(mask[0] != 'mask') {
      mask[1] = parseInt(get64binary(mask[1]))
  }
})

// shamelessly stolen from stackoverflow
function get64binary(int) {
  if (int>=0)
      return int
        .toString(2)
        .padStart(36, "0");
  // else
  return (-int-1)
    .toString(2)
    .replace(/[01]/g, function(d){return +!+d;}) // hehe: inverts each char
    .padStart(36, "1");
}

function maskValues(mask, binary) {
  let newBinary = []
  for(let i = 0; i< mask.length; i++) {
    if(mask[i] != 'X' && mask[i] != binary[i]) {
      // binary[i] = mask[i]
      newBinary.push(mask[i])
    } else {
      newBinary.push(binary[i])
    }
  }
  return newBinary.join('')
}

const sumOfAllMemory = () => {
  let memMap = new Map()
  input.forEach(element => {
    if (element[0] == 'mask') {
      mask = element[1].padStart(36, '0')
    } else {
      // console.log(mask)
      // console.log(get64binary(element[1]))
      let maskedVal = maskValues(mask, get64binary(element[1]))
      // console.log(maskedVal)
      // console.log(parseInt(maskedVal,2))
      memMap.set(element[0], parseInt(maskedVal,2))
    }
  });
  let sum = 0
  memMap.forEach((value, key, map) => {
    sum+=value
  })
  return sum
}

console.log(sumOfAllMemory())