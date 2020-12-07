const fs = require('fs')


var contents = fs.readFileSync('./day7/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// split by empty newline then by whitespace or newline
const inputTxt = contents.split(/\r?\n/).map((str) => str.split(' contain '))
const goldenParents = new Set();

const parentBagMap = new Map()

const createBagMap = (input) => {
  input.forEach(line => {
    // 1 vibrant indigo bag, 5 muted gold bags, 4 bright tomato bags, 3 dull tan bags.
    const bagSet = new Set()
    line[1].split(',').forEach((bags => {
      // stupid regex.match wasn't working
      // const bagRegex = /^\d(.*)bag/g
      // change input 'no' to 0 for ease of use
      let substring = bags.split('bag')[0].split(/[0-9]/g)
      bagSet.add(substring[1].trim())
    }))
    const parentBag = line[0].split('bag')[0].trim()
    parentBagMap.set(parentBag, bagSet)
    if(bagSet.has("shiny gold")) {
      goldenParents.add(parentBag)
    }
  })
  goldenParents.forEach(goldenParent => {
    parentBagMap.forEach((childBags, parentBag, bagMap) => {
      if(childBags.has(goldenParent)) {
        bagMap.get(parentBag).add("shiny gold")
        goldenParents.add(parentBag)
      }
    })
  })
  return parentBagMap
}


const findShinyGoldCount = (bagMap)  => {
  let totalGolden = 0
  console.log(goldenParents)
  bagMap.forEach((childBags, parentBag, bagMap) => {
    if(childBags.has("shiny gold")) totalGolden++
  })
  return totalGolden
}


console.log(findShinyGoldCount(createBagMap(inputTxt)))