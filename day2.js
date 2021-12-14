(() => {
  const input = document.body.textContent.trim();
  console.log("Part 1 Solution:", part1Solution(input), "\nPart 2 Solution:", part2Solution(input));
})();

function part1Solution(input) {
  const parseInstruction = ([direction, amount]) => {
    switch (direction) {
      case 'up':
        return state => ({ ...state, depth: state.depth - Number(amount) });
      case 'down':
        return state => ({ ...state, depth: state.depth + Number(amount) });
      case 'forward':
        return state => ({ ...state, horizontal: state.horizontal + Number(amount) });
    }
  }
  const instructions = input.split("\n").map(line => parseInstruction(line.split(" ")));
  const state = instructions.reduce((state, instruction) => instruction(state), { depth: 0, horizontal: 0 });
  return state.depth * state.horizontal;
}

function part2Solution(input) {
  const parseInstruction = ([direction, amount]) => {
    switch (direction) {
      case 'up':
        return state => ({ ...state, aim: state.aim - Number(amount) });
      case 'down':
        return state => ({ ...state, aim: state.aim + Number(amount) });
      case 'forward':
        return state => ({
          ...state,
          horizontal: state.horizontal + Number(amount),
          depth: state.depth + state.aim * Number(amount),
        });
    }
  }
  const instructions = input.split("\n").map(line => parseInstruction(line.split(" ")));
  const state = instructions.reduce((state, instruction) => instruction(state), { depth: 0, horizontal: 0, aim: 0 });
  return state.depth * state.horizontal;
}