const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

function matrixDiagonal() {
  let diagonalFirst = [];
  let diagonalSecond = [];
  let result = 0;
  for (let i = 0; i < Matrix.length; i++) {
    diagonalFirst.push(Matrix[i][i]);
    diagonalSecond.push(Matrix[i][Matrix.length - 1 - i]);
  }
  for (let i = 0; i < Matrix.length; i++) {
    result += diagonalFirst[i] - diagonalSecond[i];
  }
  return result;
}

console.log(matrixDiagonal());
