const fs = require('fs')
 
var contents = fs.readFileSync('./day21/input.txt', 'utf8');
// example parse
const input = contents.split(/\n/).map(str => str.split('('))

const foodAllergenMap = new Map()
const buildFoodList = () => {
  // all the foods
  let allFoods = []
  const foodList = input.map(food => {
    const ingredients = food[0].trim().split(' ')
    allFoods = allFoods.concat(ingredients)
    let allergens = food[1].split(' ')
    // remove last parenth
    allergens[allergens.length-1] = allergens[allergens.length-1].slice(0,-1)
    allergens.shift()
    allergens = allergens.join('').split(',')
    allergens.forEach(i => {
      if(foodAllergenMap.has(i)) {
        let intersect = new Set(
          [...ingredients].filter(x => foodAllergenMap.get(i).has(x)));
        foodAllergenMap.set(i, intersect)
      } else {
        foodAllergenMap.set(i, new Set([...ingredients]))
      }
    })
  })
  // get a set of all the values
  let allocatedAllergies = new Set()
  foodAllergenMap.forEach((val, key, map) => {
    allocatedAllergies = new Set([...allocatedAllergies, ...val])
  })
  let totalMissing = 0
  allFoods.forEach(food => {
    if(!allocatedAllergies.has(food)) totalMissing++;
  })
  console.log([...allocatedAllergies].sort().join(','))
  return totalMissing
}

const findIntersection = (allergen) => {
  // this isn't going to work due to the fact that there are some with 0, need to figure out how to ignore those
  let commonAllergens = [...allergen].reduce((a, b) => {new Set([...a].filter(x => b.has(x)))});
  return commonAllergens
}

const findNonAllergens = (foodList) => {
  // foodlist contains the sets 
 
}



console.log(buildFoodList())
// console.log(foodList)