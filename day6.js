(() => {
  const input = document.body.textContent.trim();
  const fishAges = input.split(",").map(Number);
  console.log("Part 1 Solution:", solve(fishAges, 80), "\nPart 2 Solution:", solve(fishAges, 256));
})();

function solve(fishAges, days) {
  const fishCountsByAge = {
    ...new Array(9).fill(0), // 0-8 with count 0
    ...fishAges.reduce((fishCountsByAge, age) => ({
      ...fishCountsByAge,
      [age]: (fishCountsByAge[age] ?? 0) + 1
    }), 0)
  };

  const finalFishCounts = new Array(days).fill(0).reduce(fishCountsByAge => ({
    0: fishCountsByAge[1],
    1: fishCountsByAge[2],
    2: fishCountsByAge[3],
    3: fishCountsByAge[4],
    4: fishCountsByAge[5],
    5: fishCountsByAge[6],
    6: fishCountsByAge[7] + fishCountsByAge[0],
    7: fishCountsByAge[8],
    8: fishCountsByAge[0],
  }), fishCountsByAge);
  
  return Object.values(finalFishCounts).reduce((a, b) => a + b, 0);
}