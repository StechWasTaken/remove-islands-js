import IslandBoard from "./source/IslandBoard.js";

const board = new IslandBoard(250);

document.body.append(board.getElement());

board.removeIslands();