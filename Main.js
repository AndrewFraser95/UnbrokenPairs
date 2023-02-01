//#region Helpers
function getAllNumbersBetween(x, y) {
  // Should be a better way of doing this like range() in python
  // Don't have time to check
  var numbers = [];
  for (var i = x; i <= y; i++) {
    numbers.push(i);
  }
  return numbers;
}

function addPairToStoreWithLeftToRightCoordinates(
  inputString,
  letter1,
  letter2,
  index1,
  index2,
  pairStore
) {
  // Find pair and add to store in X <= Y order.
  if (inputString[index1] === letter1 && inputString[index2] === letter2) {
    const pairStoreValue =
      index1 > index2 ? [index2, index1] : [index1, index2];
    pairStore.push(pairStoreValue);
  }
  return pairStore;
}

function findMiddleIndexesAndUpdateRunningPairList(
  middleNumbers,
  blockedIndexes,
  runningPairList,
  pair
) {
  middleNumbers.forEach((blockingIndex) => {
    blockedIndexes.push(blockingIndex);
  });
  runningPairList.push(pair);
  return { blockedIndexes, runningPairList };
}

function reduceToNonConflictingPairs(pairStore) {
  let currentHighest = 0;
  let highestPairList = [];
  let runningPairList = [];
  let blockedIndexes = [];
  for (let i = 0; i < pairStore.length - 1; i++) {
    blockedIndexes = [];
    runningPairList = [];

    const concretePair = pairStore[i];
    const middleNumbers = getAllNumbersBetween(
      concretePair[0],
      concretePair[1]
    );
    ({ blockedIndexes, runningPairList } =
      findMiddleIndexesAndUpdateRunningPairList(
        middleNumbers,
        blockedIndexes,
        runningPairList,
        concretePair
      ));

    pairStore.forEach((pair) => {
      if (
        !blockedIndexes.includes(pair[0]) &&
        !blockedIndexes.includes(pair[1])
      ) {
        const middleNumbers = getAllNumbersBetween(pair[0], pair[1]);
        ({ blockedIndexes, runningPairList } =
          findMiddleIndexesAndUpdateRunningPairList(
            middleNumbers,
            blockedIndexes,
            runningPairList,
            pair
          ));
      }
    });
    let currentPairListLength = runningPairList?.length || 0;
    if (currentHighest < currentPairListLength) {
      currentHighest = currentPairListLength;
      highestPairList = runningPairList;
    }
  }
  return highestPairList;
}
//#endregion

//#region Main
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
      pairStore = addPairToStoreWithLeftToRightCoordinates(
        inputString,
        "A",
        "B",
        i,
        j,
        pairStore
      );
      pairStore = addPairToStoreWithLeftToRightCoordinates(
        inputString,
        "X",
        "Y",
        i,
        j,
        pairStore
      );
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
//#endregion
