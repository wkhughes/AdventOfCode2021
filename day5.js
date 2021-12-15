(() => {
  const input = document.body.textContent.trim();
  const lineToPoint = line => line.split(" -> ").map(csv => csv.split(",").map(Number));
  const points = input.split("\n").map(lineToPoint);

  console.log("Part 1 Solution:", solve(points, false), "\nPart 2 Solution:", solve(points, true));
})();

function solve(points, includeDiagonal) {
  const Direction = {
    Horizontal: 'Horizontal',
    Vertical: 'Vertical',
    Diagonal: 'Diagonal',
    AntiDiagonal: 'AntiDiagonal',
  };

  let numLinesAt = {};
  let numPointsWithOverlap = 0;

  const incrementNumLinesAt = (i, j) => {
    const key = i + "," + j;
    numLinesAt[key] = (numLinesAt[key] || 0) + 1;
    if (numLinesAt[key] === 2) {
      numPointsWithOverlap++;
    }
  }
  
  const getDirection = (from, to) => {
    if (from[0] === to[0]) {
      return Direction.Horizontal;
    } else if (from[1] === to[1]) {
      return Direction.Vertical;
    } else if (from[0] < to[0] && from[1] < to[1] || from[0] > to[0] && from[1] > to[1]) {
      return Direction.Diagonal;
    } else {
      return Direction.AntiDiagonal;
    }
  }

  for (const [from, to] of points) {
    const direction = getDirection(from, to);
    if (direction === Direction.Vertical) {
      for (let i = Math.min(from[0], to[0]); i <= Math.max(from[0], to[0]); i++) {
        incrementNumLinesAt(i, from[1]);
      }
    } else if (direction === Direction.Horizontal) {
      for (let j = Math.min(from[1], to[1]); j <= Math.max(from[1], to[1]); j++) {
        incrementNumLinesAt(from[0], j);
      }
    } else if (includeDiagonal) {
      const [start, end] = from[0] < to[0] ? [from, to] : [to, from];
      // Diagonal (\) column increases, anti-diagonal (/) column decreases
      for (
        let i = start[0], j = start[1];
        i <= end[0];
        i++, direction === Direction.Diagonal ? j++ : j--
      ) {
        incrementNumLinesAt(i, j);
      }
    }
  }

  return numPointsWithOverlap;
}