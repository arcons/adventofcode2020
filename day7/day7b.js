const fs = require('fs')


var contents = fs.readFileSync('./day7/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// split by empty newline then by whitespace or newline
const inputTxt = contents.split(/\r?\n/).map((str) => str.split(' contain '))

const parentBagMap = new Map()
const createBagMap = (input) => {
  input.forEach(line => {
    let bagCount = 0
    let totalBags = 0
    const bagSet = new Set()
    line[1].split(',').forEach((bags => {
      let substring = bags.split('bag')[0]
      bagCount = parseInt(/[0-9]/g.exec(substring)[0])
      totalBags += bagCount
      const bagName = substring.split(/[0-9]/g.exec(substring))[1].trim()
      if(bagName !== 'other'){
        bagSet.add({bagName, bagCount})
      }
    }))
    const parentBag = line[0].split('bag')[0].trim()
    parentBagMap.set(parentBag, {bagSet, totalBags})
  })
  return parentBagMap
}

var sum = 0
const findAllChildBags = (parentBags, total, parentBagCount) => {
  if(parentBags.totalBags != 0) {
    parentBags.bagSet.forEach(child => {
      console.log("Starting with", child.bagName)
      total = findAllChildBags(parentBagMap.get(child.bagName), total, child.bagCount * parentBagCount) * child.bagCount * parentBagCount
      console.log(`Total children for ${child.bagName}`, total)
      sum += total
    })
  }
  return 1
  
}

findAllChildBags(createBagMap(inputTxt).get("shiny gold"), 0, 1)
console.log(sum)