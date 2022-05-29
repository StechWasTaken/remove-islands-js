export default class BoardNode {
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
    isLand() {
        return this.element.classList.contains("land");
    }
    
    makeLand() {
        this.element.classList.remove("water");
        this.element.classList.add("land");
    }

    makeWater() {
        this.element.classList.remove("land");
        this.element.classList.add("water");
    }
}