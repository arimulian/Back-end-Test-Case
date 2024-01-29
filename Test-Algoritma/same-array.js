const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

function sameArray(input, query) {
  let result = [];
  for (let i = 0; i < query.length; i++) {
    let count = 0;
    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}

console.log(sameArray(INPUT, QUERY));
