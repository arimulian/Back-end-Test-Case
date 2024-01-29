let reverseWord = "NEGIE1";
let result = "";
for (let i = reverseWord.length - 1; i >= 0; i--) {
  let charLast = reverseWord[i];
  if (charLast === "1") {
    continue;
  } else if (charLast === "N") {
    charLast += "1";
  }
  result += charLast;
}

console.log(result);
