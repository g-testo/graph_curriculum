const util = require('util');

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
        this.adjacencyMap = new Map();
        this.directed = directed;
        this.weighted = weighted;
    }
    getVertex(id){
        let vertex;
        this.adjacencyMap.forEach((_,value)=>{
          if(value.id === id){
            vertex = value;
          }
        })
        return vertex;
    }
    addVertex(id, label){
        let vertex = new Vertex(id, label);
        this.adjacencyMap.set(vertex, []);
    }
    addEdge(src, dest, weight){
        let srcVertex = this.getVertex(src);
        let srcEdges = this.adjacencyMap.get(srcVertex);
        srcEdges.push(this.weighted ? new Edge(dest, weight): dest);
        this.adjacencyMap.set(srcVertex, srcEdges);

        if(!this.directed){
            let destVertex = this.getVertex(dest);
            let destEdges = this.adjacencyMap.get(destVertex);
            destEdges.push(this.weighted ? new Edge(src, weight): src);
            this.adjacencyMap.set(destVertex, destEdges);    
        }
    }
    dfs(src){
        let visited = [];
        let stack = [src];
        while(stack.length > 0){
            let vertexId = stack.pop();
            if(visited.indexOf(vertexId) === -1){
                visited.push(vertexId);
                let edgeList = this.adjacencyMap.get(this.getVertex(vertexId));
                for(let i=0;i<edgeList.length;i++){
                    stack.push(edgeList[i].id);
                }
            }
        }
        return visited;
    }
    bfs(src){
        let visited = [];
        let queue = [src];
        while(queue.length > 0){
            let vertexId = queue.shift();
            if(visited.indexOf(vertexId) === -1){
                let vertex = this.getVertex(vertexId);
                visited.push(vertex.id);
                let edgeList = this.adjacencyMap.get(vertex);
                for(let i=0;i<edgeList.length;i++){
                    queue.push(edgeList[i].id);
                }
            }
        }
        return visited;
    }
}

let graph = new Graph(false, true);

graph.addVertex(0, "Zero");
graph.addVertex(1, "One");
graph.addVertex(2, "Two");
graph.addVertex(3, "Three");
graph.addVertex(4, "Four");
graph.addVertex(5, "Five");

graph.addEdge(0, 1, 2);
graph.addEdge(1, 5, 5);
graph.addEdge(5, 3, 2);

let result = graph.bfs(1);
// console.log(result);

console.log(util.inspect(graph, {showHidden: false, depth: null}))