export default class IslandNode {
    constructor(position) {
        this.element = document.createElement("div");
        this.element.classList.add("node");
        this.position = position;
        this.makeWater();
    }

    /**
     * 
     * @returns {Boolean}
     */
    isIsland() {
        return this.element.classList.contains("island");
    }
    
    makeIsland() {
        this.element.classList.remove("water");
        this.element.classList.add("island");
    }

    makeWater() {
        this.element.classList.remove("island");
        this.element.classList.add("water");
    }
}