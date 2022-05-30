import BoardNode from "./BoardNode.js";
import Queue from "./Queue.js";

const TIMEOUT_TIME = 1;

export default class IslandBoard {
    constructor(size) {
        this.size = size;
        this.board = [];

        for (let i = 0; i < this.size * this.size; i++) {
            const node = new BoardNode(i);

            if (Math.random() < 1.15 * Math.random()) node.makeLand();

            this.board[i] = node;
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
        const search = new Set();
        const nodes = new Set();
        const visited = new Set();

        for (const node of this.iterator()) if (node.isLand()) nodes.add(node);
        
        for (let i = 0; i < this.size; i++) {
            const node1 = this.board[i];
            const node2 = this.board[(this.size - 1) * this.size + i];
            const node3 = this.board[i * this.size];
            const node4 = this.board[i * this.size + this.size - 1];
            if (node1.isLand()) search.add(node1);
            if (node2.isLand()) search.add(node2);
            if (node3.isLand()) search.add(node3);
            if (node4.isLand()) search.add(node4);
        }

        const promises = [];

        for (const node of search) {
            promises.push(new Promise(async (resolve) => {
                const queue = new Queue();
                queue.add(node);
                visited.add(node);

                while (!queue.isEmpty()) {
                    const current = queue.remove();
                    const neighbors = this.getNeighbors(current);

                    current.element.classList.add("search");

                    await new Promise(resolve => setTimeout(resolve, TIMEOUT_TIME));

                    nodes.delete(current);

                    for (const neighbor of neighbors) {
                        if (!neighbor.isLand() || visited.has(neighbor)) continue;
                        visited.add(neighbor);
                        queue.add(neighbor);
                    }
                }

                resolve();
            }));
        }

        await Promise.all(promises);

        for (const node of nodes) {
            node.makeWater();
        }

        for (const node of this.iterator()) {
            node.element.classList.remove("search");
        }
    }
}