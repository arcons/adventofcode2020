const fs = require('fs')

var contents = fs.readFileSync('./day14/input.txt', 'utf8');
const input = contents.split("\n").map(str => str.split(" = "))

input.forEach(mask => {
  if(mask[0] != 'mask') {
      mask[1] = parseInt(get64binary(mask[1]))
  }
})

// stolen from stack overflow don't cur
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
    // floating spooky
    if(mask[i] == 'X') {
      newBinary.push(mask[i])
    } else if (mask[i] == '1') {
      newBinary.push('1')
    } else {
      newBinary.push(binary[i])
    }
  }
  return newBinary
}

const findFloatingCombo = (floatAddess) => {
  let addresses = []
  let indices = []
  for(let i=0; i<floatAddess.length;i++) {
      if (floatAddess[i] === "X") indices.push(i);
  }
  let allBinaryCombos = []
  for(let i=0; i<Math.pow(2, indices.length); i++) {
    allBinaryCombos.push(get64binary(i).substring(36-indices.length).split(''))
  }

  // loop through all the combos
  allBinaryCombos.forEach(combo => {
    let maskedAddressOption = floatAddess.concat()
    for(let j = 0; j<combo.length; j++) {
      maskedAddressOption[indices[j]] = combo[j]
    }
    addresses.push(parseInt(maskedAddressOption.join(''),2))
  })

  return addresses;
}

const findAllComination = (floatAddess) => {
  let addresses = new Set();
  let floatIndices = []
  for(let i=0; i<floatAddess.length;i++) {
      if (floatAddess[i] === "X") indices.push(i);
  }


}

const sumOfAllMemory = () => {
  let memMap = new Map()
  input.forEach(element => {
    if (element[0] == 'mask') {
      mask = element[1].padStart(36, '0')
    } else {
      const memAddres = element[0].substring(
        element[0].lastIndexOf("[") + 1, 
        element[0].lastIndexOf("]"))
      let maskedVal = maskValues(mask, get64binary(parseInt(memAddres)))
      let memAddresses = findFloatingCombo(maskedVal)
      memAddresses.forEach(addr => {
        memMap.set(addr, element[1])
      })
    }
  });
  let sum = 0
  memMap.forEach((value, key, map) => {
    sum+=value
  })
  return sum
}

console.log(sumOfAllMemory())