import IslandBoard from "./source/IslandBoard.js";

var board = new IslandBoard(100);

document.body.append(board.getElement());

document.getElementById("run").addEventListener("click", function() {
    board.removeIslands();
    this.disabled = true;
});

document.getElementById("reset").addEventListener("click", function() {
    board = new IslandBoard(100);
    document.querySelector(".board").remove();
    document.body.append(board.getElement());
    document.getElementById("run").disabled = false;
});
