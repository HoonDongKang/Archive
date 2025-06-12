class WeightedGraphVertex {
    constructor(value) {
        this.value = value;
        this.adjacent_vetices = {};
    }

    addAdjacentVertex(vertex, weight) {
        this.adjacent_vetices[vertex.value] = weight;
    }

    removeAdjacentVertex(vertex) {
        delete this.adjacent_vetices[vertex.value];
    }
}

let seoul = new WeightedGraphVertex("seoul");
let wonju = new WeightedGraphVertex("wonju");
let gangneugn = new WeightedGraphVertex("gangneugn");
let daejeon = new WeightedGraphVertex("daejeon");
let jeonju = new WeightedGraphVertex("jeonju");
let daegu = new WeightedGraphVertex("daegu");

seoul.addAdjacentVertex(wonju, 87);
seoul.addAdjacentVertex(daejeon, 140);
seoul.addAdjacentVertex(jeonju, 187);

console.log(seoul.adjacent_vetices);

seoul.removeAdjacentVertex(jeonju);

console.log(seoul.adjacent_vetices);
