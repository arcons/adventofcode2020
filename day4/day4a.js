const fs = require('fs')
 
var contents = fs.readFileSync('./day4/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// split by empty newline then by whitespace or newline
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\s+/))

let codeSet = new Set()
codeSet.add("byr")
codeSet.add("iyr")
codeSet.add("eyr")
codeSet.add("hgt")
codeSet.add("hcl")
codeSet.add("ecl")
codeSet.add("pid")
// codeSet.add("cid")

const getValidPassports = (input, codeSet) => {
  // ex input row ['byr:2010', 'pid:#1bb4d8', 'eyr:2021', 'hgt:186cm', 'iyr:2020', 'ecl:grt']
  let totalValid = 0
  input.forEach(entry => {
    let validCount = 0
    entry.forEach(element => {
      idData = element.split(':')
      if(codeSet.has(idData[0])) {
        validCount++
      }
    });
    if(validCount >= 7) {
      totalValid++
    }
  });
  return totalValid
}

console.log("valid passports", getValidPassports(input, codeSet))

