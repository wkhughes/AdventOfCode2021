(() => {
  const input = document.body.textContent.trim();
  const depths = input.split("\n").map(depth => Number(depth));

  console.log("Part 1 Solution:", numIncreases(depths, 1), "\nPart 2 Solution:", numIncreases(depths, 3));
})();

function numIncreases(depths, windowLength) {
  const sumWindow = (i) => depths.slice(i, i + windowLength).reduce(( sum, current ) => sum + current);
  const { numIncreases } = depths.reduce(({ numIncreases, previousSum }, _currentDepth, index) => {
    const currentSum = sumWindow(index);
    return {
      numIncreases: numIncreases + (currentSum > previousSum ? 1 : 0),
      previousSum: currentSum
    };
  }, { numIncreases: 0, previousSum: Number.MAX_SAFE_INTEGER });
  return numIncreases;
}