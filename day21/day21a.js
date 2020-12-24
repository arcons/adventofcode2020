const fs = require('fs')
 
var contents = fs.readFileSync('./day21/testinput.txt', 'utf8');
// example parse
const input = contents.split(/\n/).map(str => str.split('('))

const foodAllergenMap = new Map()
const buildFoodList = () => {
  const foodList = input.map(food => {
    const ingredients = food[0].trim().split(' ')
    const allergens = food[1].split(' ')
    // remove last parenth
    allergens[allergens.length-1] = allergens[allergens.length-1].slice(0,-1)
    foodAllergenMap.set(JSON.parse(ingredients), new Set(allergens))
  })
}

const findIntersection = (foods, allergen) => {
  // this isn't going to work due to the fact that there are some with 0, need to figure out how to ignore those
  let commonAllergens = [...allergen].reduce((a, b) => {new Set([...a].filter(x => b.has(x)))});
  let commonFoods = [...foods].reduce((a, b) => {new Set([...a].filter(x => b.has(x)))});
  return {commonFoods, commonAllergens}
}

const findNonAllergens = (foodList) => {
  // foodlist contains the sets 
  foodAllergenMap.forEach((allergens, ingredients, faMap) => {
  });
 
}



findNonAllergens(buildFoodList())
console.log(foodList)