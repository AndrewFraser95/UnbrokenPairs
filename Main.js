function getAllNumbersBetween(x, y) {
  var numbers = [];
  for (var i = x; i <= y; i++) {
    numbers.push(i);
  }
  return numbers;
}

function addPairToStore(
  inputString,
  letter1,
  letter2,
  index1,
  index2,
  pairStore
) {
  if (inputString[index1] === letter1 && inputString[index2] === letter2) {
    const pairStoreValue =
      index1 > index2 ? [index2, index1] : [index1, index2];
    console.log(`Has pair at ${pairStoreValue[0]}, ${pairStoreValue[1]}`);

    pairStore.push(pairStoreValue);
  }
  return pairStore;
}

function reduceToNonConflictingPairs(pairStore) {
  let currentHighest = 0;
  let highestPairList = [];
  let runningPairList = [];
  let blockedIndexes = [];
  for (let i = 0; i < pairStore.length - 1; i++) {
    blockedIndexes = [];
    runningPairList = [];
    for (let j = 0; j < pairStore.length; j++) {
      if (
        !blockedIndexes.includes(pairStore[j][0]) &&
        !blockedIndexes.includes(pairStore[j][1])
      ) {
        const middleNumbers = getAllNumbersBetween(
          pairStore[j][0],
          pairStore[j][1]
        );
        middleNumbers.forEach((blockingIndex) => {
          blockedIndexes.push(blockingIndex);
        });
        runningPairList.push(pairStore[j]);
      }
    }
    let currentPairListLength = runningPairList?.length || 0;
    if (currentHighest < currentPairListLength) {
      currentHighest = currentPairListLength;
      highestPairList = runningPairList;
    }
  }
  return highestPairList;
}

const PairWise = () => {
  //#region ugly javascript html text editing, ignore
  var inputString = document.getElementById("pairInput").value;
  var outputField = document.getElementById("listOfPairs");
  outputField.setAttribute("style", "white-space: pre;");
  outputField.textContent = "";
  //#endregion

  let pairStore = [];
  for (let i = 0; i < inputString.length - 1; i++) {
    for (let j = 0; j < inputString.length; j++) {
      pairStore = addPairToStore(inputString, "A", "B", i, j, pairStore);
      pairStore = addPairToStore(inputString, "X", "Y", i, j, pairStore);
    }
  }
  let highestPairChain = reduceToNonConflictingPairs(pairStore);

  //#region ugly javascript html text editing, ignore
  outputField.textContent +=
    "This string has " + highestPairChain.length + " pairs.";
  outputField.textContent += "\r\n" + "The pairs are at indexes";

  highestPairChain.forEach((pair) => {
    outputField.textContent += "\r\n" + pair;
  });
  //#endregion
};
