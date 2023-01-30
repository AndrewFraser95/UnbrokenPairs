function getAllNumbersBetween(x, y) {
  var numbers = [];
  for (var i = x; i < y; i++) {
    numbers.push(i);
  }
  return numbers;
}

function findNewPairWithLetters(
  inputString,
  letter1,
  letter2,
  index1,
  index2,
  pairBlocks,
  pairCount
) {
  if (
    inputString[index1] === letter1 &&
    inputString[index2] === letter2 &&
    !pairBlocks.includes(index1) &&
    !pairBlocks.includes(index2)
  ) {
      pairBlocks = pairBlocks.concat(getAllNumbersBetween(index1, index2));
      console.log(`Has pair at ${index1}, ${index2}`);
    pairCount += 1;
  }
  return { pairBlocks, pairCount };
}

const PairWise = () => {
  var inputString = document.getElementById("pairInput").value;
  var outputField = document.getElementById("listOfPairs");
  outputField.textContent = '';

  let pairCount = 0;
  let pairBlocks = [];
  for (let i = 0; i < inputString.length - 1; i++) {
    for (let j = i + 1; j < inputString.length; j++) {
      ({ pairBlocks, pairCount } = findNewPairWithLetters(
        inputString,
        "A",
        "B",
        i,
        j,
        pairBlocks,
        pairCount
      ));
      ({ pairBlocks, pairCount } = findNewPairWithLetters(
        inputString,
        "X",
        "Y",
        i,
        j,
        pairBlocks,
        pairCount
      ));
    }
    }
    outputField.textContent += "This string has " + pairCount + " pairs.";
  return pairCount;
};
