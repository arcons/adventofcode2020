const fs = require('fs')
 
var contents = fs.readFileSync('./day4/input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// split by empty newline then by whitespace or newline
const input = contents.split(/\n\s*\n/).map((str) => str.split(/\s+/))

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
const checkYear = (lower, upper) => (testVal) => {
  if (upper >= parseInt(testVal) &&  parseInt(testVal) >= lower) {
    return true;
  }
  return false;
}

// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
const checkHeight = (testVal) => {
  numUnit = testVal.match(/([0-9]+)([A-Za-z]+)/);
  if(numUnit && numUnit.length === 3){
    if(numUnit[2] === "cm") {
      if(193 >= parseInt(numUnit[1]) && parseInt(numUnit[1]) >= 150) return true;
    } else if(numUnit[2] === "in") {
      if(76 >= parseInt(numUnit[1]) && parseInt(numUnit[1]) >= 59) return true;
    }
  }
  return false;
}

var eyeSet = new Set()
eyeSet.add("amb")
eyeSet.add("blu")
eyeSet.add("brn")
eyeSet.add("gry") 
eyeSet.add("grn") 
eyeSet.add("hzl") 
eyeSet.add("oth")
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
const checkEyeColor = (testVal) => {
  return eyeSet.has(testVal);
}

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
const checkHairColor = (testVal) => {
  if(testVal[0] === '#') {
    return /^[a-f0-9]{6}$/.test(testVal.slice(1))
  }
  return false;
}

// pid (Passport ID) - a nine-digit number, including leading zeroes.
const checkPID = (testVal) => {
  if (testVal.length === 9) {
    return true;
  }
  return false;
}


const codeSet = new Map()
// cid (Country ID) - ignored, missing or not.
codeSet.set("byr", checkYear(1920, 2002))
codeSet.set("iyr", checkYear(2010, 2020))
codeSet.set("eyr", checkYear(2020, 2030))
codeSet.set("hgt", checkHeight)
codeSet.set("hcl", checkHairColor)
codeSet.set("ecl", checkEyeColor)
codeSet.set("pid", checkPID)
// codeSet.set("cid")

const getValidPassports = (input, codeSet) => {
  let totalValid = 0
  input.forEach(entry => {
    let validCount = 0
    entry.forEach(element => {
      idData = element.split(':')
      if(codeSet.has(idData[0])) {
        if(codeSet.get(idData[0])(idData[1])) {
          validCount++
        }
      }
    });
    if(validCount >= 7) {
      totalValid++
    }
  });
  return totalValid
}

console.log("valid passports", getValidPassports(input, codeSet))

