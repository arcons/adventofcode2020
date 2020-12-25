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
  // need to reduce the map and find which allergen matches to a ingredient
  let output = []
  let foodOrgnaized = []
  foodAllergenMap.forEach((val, key, map) => {
    foodOrgnaized.push(key)
  })
  //
  let FOSet = [...foodOrgnaized.sort()]
  let all = []
  FOSet.forEach(val => {
    // all = new Set([...all, ...foodAllergenMap.get(val)])
    all.push([...foodAllergenMap.get(val)])
  })
  all = all.flat()
  console.log(all.join(','))

  let testSet = new Set([...all])


  all.forEach(val => output.includes(val) ? null : output.push(val))
  console.log([...new Set([...output])].join(','))

  // foodAllergenMap.forEach((val, key, map) => {
  //   map.forEach((food, allergen, currMap) => {
  //     if(key != allergen) {
  //       let difference = new Set(
  //         [...food].filter(x => !val.has(x)));
  //       console.log(difference)
  //       map.set(allergen, difference)
  //     }
  //   })
  // })

  let foodContains = []
  while(foodContains.length <= foodAllergenMap.size) {
    foodAllergenMap.forEach((val, key, map) => {
      if(val.size === 1) {
        const allergy = [...val][0]
        const keyAll = {key, allergy}
        map.forEach((food, allergen, currMap) => {
          if(food.has(allergy) && food.size !== 1) {
            let difference = new Set(
              [...food].filter(x => !val.has(x)));
            map.set(allergen, difference)
          }
        })
        if(!foodContains.includes(keyAll)){
          foodContains.push({key, allergy})
          // foodContains.push({key, allergy})
        }
      }
    })
  }
  FOSet = [...foodOrgnaized.sort()]
  all = []
  FOSet.forEach(val => {
    // all = new Set([...all, ...foodAllergenMap.get(val)])
    all.push([...foodAllergenMap.get(val)])
  })
  all = all.flat()
  // testSet = new Set([...all])

  return [...all].join(',')
}

function compare( a, b ) {
  if ( a.key < b.key ){
    return -1;
  }
  if ( a.key > b.key ){
    return 1;
  }
  return 0;
}

console.log(buildFoodList())
// console.log(foodList)