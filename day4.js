(() => {
  const input = document.body.textContent.trim();
  const [numbersToDrawCSV, ...boardLines] = input.split("\n").filter(Boolean);
  const numbersToDraw = numbersToDrawCSV.split(",").map(Number);
  const boards = [];
  for (let i = 0; i <= boardLines.length - 5; i += 5) {
    boards.push(boardLines.slice(i, i + 5).map(line => line.trim().replaceAll("  ", " ").split(" ").map(Number)));
  }

  const { firstWinScore, lastWinScore } = solve(numbersToDraw, boards);

  console.log("Part 1 Solution:", firstWinScore, "\nPart 2 Solution:", lastWinScore);
})();

function solve(numbersToDraw, boards) {
  const boardSize = boards[0].length;

  const boardMarkedCounts = boards.map(board => ({
    rowUnmarkedCount: new Array(boardSize).fill(boardSize),
    columnUnmarkedCount: new Array(boardSize).fill(boardSize),
    unmarkedSum: board.reduce((sum, row) => row.reduce((sum, number) => sum + number, sum), 0),
    hasWon: false,
  }));
  const boardCoordinatesByNumber = boards.reduce((coordinates, rows, i) =>
    rows.reduce((coordinates, row, j) =>
      row.reduce((coordinates, number, k) => ({
        ...coordinates,
        [number]: [...(coordinates[number] || []), [i, j, k]]
      }), coordinates),
      coordinates
    ),
    {}
  );

  let firstWinScore = null;
  let lastWinScore = null;
  for (const number of numbersToDraw) {
    for (const [i, j, k] of (boardCoordinatesByNumber[number] || [])) {
      if (boardMarkedCounts[i].hasWon) {
        continue;
      }

      boardMarkedCounts[i].rowUnmarkedCount[j]--;
      boardMarkedCounts[i].columnUnmarkedCount[k]--;
      boardMarkedCounts[i].unmarkedSum -= number;

      if (boardMarkedCounts[i].rowUnmarkedCount[j] === 0 || boardMarkedCounts[i].columnUnmarkedCount[k] === 0) {
        boardMarkedCounts[i].hasWon = true;
        lastWinScore = boardMarkedCounts[i].unmarkedSum * number;
        if (firstWinScore == null) {
          firstWinScore = lastWinScore;
        }
      }
    }
  }

  return { firstWinScore, lastWinScore };
}