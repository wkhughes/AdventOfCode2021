(() => {
  const input = document.body.textContent.trim();
  const numbers = input.split("\n");

  console.log("Part 1 Solution:", part1Solution(numbers), "\nPart 2 Solution:", part2Solution(numbers));
})();

function part1Solution(numbers) {
  const toNumberBasedOnCounts = oneCondition => oneCounts(numbers).map(oneCount => oneCondition(oneCount) ? "1" : "0").join("");
  const mostCommon = toNumberBasedOnCounts(oneCount => oneCount > numbers.length / 2);
  const leastCommon = toNumberBasedOnCounts(oneCount => oneCount < numbers.length / 2);

  return Number.parseInt(mostCommon, 2) * Number.parseInt(leastCommon, 2);
}

function part2Solution(numbers) {
  const findNumber = (numbers, oneCondition) => {
    let index = 0;
    while (numbers.length > 1) {
      const targetDigit = oneCondition(oneCounts(numbers)[index], numbers) ? "1" : "0";
      numbers = numbers.filter(number => number[index] === targetDigit);
      index++;
    }
    return numbers[0];
  }
  const mostCommon = findNumber(numbers, (oneCount, numbers) => oneCount >= numbers.length / 2);
  const leastCommon = findNumber(numbers, (oneCount, numbers) => oneCount < numbers.length / 2);

  return Number.parseInt(mostCommon, 2) * Number.parseInt(leastCommon, 2);
}

function oneCounts(numbers) {
  return Object.values(numbers.reduce(
    (oneCounts, number) => [...number].reduce(
      (oneCounts, digit, index) => ({
        ...oneCounts, [index]: oneCounts[index] + Number(digit)
      }), oneCounts,
    ), new Array(numbers[0].length).fill(0),
  ));
}