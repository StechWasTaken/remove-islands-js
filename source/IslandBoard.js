import IslandNode from "./IslandNode.js";
import Queue from "./Queue.js";

const TIMEOUT_TIME = 1;

export default class IslandBoard {
    constructor(size) {
        this.size = size;
        this.board = [];

        for (let i = 0; i < this.size * this.size; i++) {
            const node = new IslandNode(i);

            if (Math.random() > 0.46) node.makeIsland();

            this.board[i] = node;
        }

        for (const node of this.iterator()) {
            if (node.isIsland()) continue;
            const neighbors = this.getNeighbors(node);

            let count = 0;
            for (const neighbor of neighbors) {
                if (!neighbor.isIsland()) continue;
                count++;
            }

            if (count == neighbors.length) node.makeIsland();
        }
    }

    /**
     * 
     * @param {Number} position 
     * @returns {Boolean}
     */
    inBoard(position) {
        return position >= 0 && position < this.board.length;
    }

    /**
     * 
     * @returns {Array<IslandNode>}
     */
    iterator() {
        return this.board;
    }

    /**
     * 
     * @param {Number} position 
     * @returns 
     */
    getNode(position) {
        if (!this.inBoard(position)) return null;

        return this.board[position];
    }

    /**
     * 
     * @param {IslandNode} node 
     * @returns {Array<IslandNode>}
     */
    getNeighbors(node) {
        const y = Math.floor(node.position / this.size);
        const x = Math.floor(node.position % this.size);
        const neighbors = [];
        
        if (y - 1 >= 0) neighbors.push(this.getNode((y-1) * this.size + x));
        if (x - 1 >= 0) neighbors.push(this.getNode(y * this.size + x - 1));
        if (y + 1 < this.size) neighbors.push(this.getNode((y+1) * this.size + x));
        if (x + 1 < this.size) neighbors.push(this.getNode(y * this.size + x + 1));

        return neighbors;
    }

    /**
     * 
     * @returns {Element}
     */
    getElement() {
        const element = document.createElement("div");

        element.classList.add("board");

        for (const node of this.iterator())  {
            document.querySelector(":root").style.setProperty("--node-size", `${100 / this.size}vmin`);
            element.append(node.element);
        }

        return element;
    }

    async removeIslands() {
        const connected = new Set();

        for (const node of this.iterator()) {
            if (!node.isIsland() || connected.has(node)) continue;

            const queue = new Queue();
            const visited = new Set();

            queue.add(node);
            visited.add(node);

            while (!queue.isEmpty()) {
                const current = queue.remove();
                const neighbors = this.getNeighbors(current);

                if (neighbors.length < 4) connected.add(node);

                for (const neighbor of neighbors) {
                    if (!neighbor.isIsland() || visited.has(neighbor)) continue;
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }

            if (!connected.has(node)) {
                for (const node of visited) {
                    node.makeWater();
                    await new Promise(resolve => setTimeout(resolve, TIMEOUT_TIME));
                }
            } else {
                for (const node of visited) {
                    connected.add(node);
                }
            }
        }
    }
}