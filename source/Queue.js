class Entry {
    next = null;
    item = null;

    /**
     * 
     * @param {any} item 
     */
    constructor(item) {
        this.next = null;
        this.item = item;
    }
}

export default class Queue {
    
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    /**
     * 
     * @param {any} item 
     * @returns 
     */
    add(item) {
        const node = new Entry(item);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }

        this.length++;
    }

    /**
     * 
     * @returns {any}
     */
    remove() {
        if (this.length == 0) return null;
        const element = this.first.item;
        this.first = this.first?.next;
        this.length--;
        return element;
    }

    /**
     * 
     * @returns {any}
     */
    peek() {
        return this.first;
    }

    /**
     * 
     * @returns {Boolean}
     */
    isEmpty() {
        return this.length == 0
    }

    /**
     * 
     * @returns {Number}
     */
    size() {
        return this.length;
    }
}