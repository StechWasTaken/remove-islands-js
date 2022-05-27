import IslandBoard from "./source/IslandBoard.js";

const board = new IslandBoard(100);

document.body.append(board.getElement());

await new Promise(resolve => setTimeout(resolve, 1000));

board.removeIslands();