class City {
    constructor(name) {
        this.name = name;
        this.adjacent_cities = {};
    }

    addAdjacentCity(city, flowCapacity) {
        this.adjacent_cities[city.name] = flowCapacity;
        this.adjacent_cities[this.name] = { flow: 0, capacity: 0 };
    }

    removeAdjacentCity(city) {
        delete this.adjacent_cities[city.name];
    }
}

class MaximumFlow {
    constructor() {
        this.all_cities = {};
        this.paths = [];
    }

    registerCity(city) {
        this.all_cities[city.name] = city;
    }

    DFS(source, sink, visited_cities = {}) {
        if (source.name == sink.name) return true;

        visited_cities[source.name] = true;
        for (let adjacent in source.adjacent_cities) {
            let edge = source.adjacent_cities[adjacent];
            if (visited_cities[adjacent]) {
                continue;
            } else if (edge.capacity - edge.flow > 0) {
                this.paths.push(source);
                if (this.DFS(this.all_cities[adjacent], sink, visited_cities)) {
                    return true;
                } else {
                    this.paths.pop();
                }
            }
        }

        return false;
    }

    FordFulkerson(source, sink) {
        let total = 0;
        while (this.DFS(source, sink)) {
            this.paths.push(sink);
            let currentPathFlow = Infinity;

            for (let i = 0; i < this.paths.length - 1; i++) {
                let currentCity = this.paths[i];
                let nextCity = this.paths[i + 1];
                let edge = currentCity.adjacent_cities[nextCity.name];
                currentPathFlow = Math.min(currentPathFlow, edge.capacity - edge.flow);
            }

            for (let i = 0; i < this.paths.length - 1; i++) {
                let currentCity = this.paths[i];
                let nextCity = this.paths[i + 1];
                currentCity.adjacent_cities[nextCity.name].flow += currentPathFlow;
                currentCity.adjacent_cities[currentCity.name].flow -= currentPathFlow;
            }

            total += currentPathFlow;
            this.paths = [];
        }

        console.log(total);
    }
}

let city1 = new City("city1");
let city2 = new City("city2");
let city3 = new City("city3");
let city4 = new City("city4");

let max = new MaximumFlow();
max.registerCity(city1);
max.registerCity(city2);
max.registerCity(city3);
max.registerCity(city4);

city1.addAdjacentCity(city2, { flow: 0, capacity: 1 });
city1.addAdjacentCity(city3, { flow: 0, capacity: 2 });
city2.addAdjacentCity(city3, { flow: 0, capacity: 1 });
city2.addAdjacentCity(city4, { flow: 0, capacity: 2 });
city3.addAdjacentCity(city4, { flow: 0, capacity: 2 });

max.FordFulkerson(city1, city4);
