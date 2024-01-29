const sentence = "Saya sangat senang mengerjakan soal algoritma";

function wordLength(sentence) {
  let word = sentence.split(" ");
  let result = [];
  for (let i = 0; i < word.length; i++) {
    result.push(word[i].length);
  }
  const max = Math.max(...result);
  return word[result.indexOf(max)] + ": " + max;
}

console.log(wordLength(sentence));
