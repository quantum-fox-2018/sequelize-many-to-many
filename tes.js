let array = [1,2,3,4,5]

let array2 = [2,5,6,7,8]

for(let i=0; i<array2.length; i++){
  array = array.filter(arr => arr !== array2[i])
}

console.log(array)
