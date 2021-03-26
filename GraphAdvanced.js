const util = require('util');

// let edge0_1 = new Edge(1, 15);
// let edge1_2 = new Edge(2, 5);



// [[],[],[]]
// {{}:[{}], {}:[{}], {}:[{}]}

// {{id:0,label:"Zero"}:[{weight:3, vertexId:1}, {weight:5, vertexId:2}]}

class Vertex{
    constructor(id, label){
        this.id = id;
        this.label = label;
    }
}
class Edge{
    constructor(id, weight){
        this.id = id;
        this.weight = weight;
    }
}

class Graph{
    constructor(directed=false, weighted=false){
        this.adjMap = new Map();
        this.directed = directed;
        this.weighted = weighted;
    }
    addVertex(id, label){
        let vertex = new Vertex(id, label);
        this.adjMap.set(vertex, []);
    }
    getVertex(id){
        let vertex;
        this.adjMap.forEach((_, key)=>{
            if(key.id === id){
                vertex = key;
            }
        })
        return vertex;
    }
    addEdge(srcId, destId, weight){
        let srcVertex = this.getVertex(srcId);
        let srcEdges = this.adjMap.get(srcVertex);
        srcEdges.push(this.weighted ? new Edge(destId, weight): destId);
        this.adjMap.set(srcVertex, srcEdges);

        if(!this.directed){
            let destVertex = this.getVertex(destId);
            let destEdges = this.adjMap.get(destVertex);
            destEdges.push(this.weighted ? new Edge(srcId, weight): srcId);
            this.adjMap.set(destVertex, destEdges);
        }
    }
    

}
let graph = new Graph(false, true);


graph.addVertex(0, "Zero");
graph.addVertex(1, "One");
graph.addVertex(2, "Two");
graph.addVertex(3, "Three");

graph.addEdge(0, 1, 15);
graph.addEdge(1, 2, 5);
graph.addEdge(2, 3, 25);
graph.addEdge(3, 0, 50);

console.log(util.inspect(graph, true, 5, true));

// let result = graph.getVertex(0);

// console.log(result);