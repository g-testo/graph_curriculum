class Graph{
    constructor(){
        this.adjList = [];
    }
    addVertex(){
        this.adjList.push([]);
        return this.adjList.length-1;
    }
    addEdge(vertex1, vertex2){
        this.adjList[vertex1].push(vertex2);
        this.adjList[vertex2].push(vertex1);
    }
    dfs(src){
        let visited = [];
        let stack = [src];
        while(stack.length > 0){
            let currentVert = stack.pop();
            if(!visited.includes(currentVert)){
                visited.push(currentVert);
                let edges = this.adjList[currentVert];
                for(let i=0;i<edges.length;i++){
                    stack.push(edges[i]);
                }
            }
        }
        return visited;
    }
    bfs(src){
        let visited = [];
        let queue = [src];
        while(queue.length > 0){
            let currentVert = queue.shift();
            if(!visited.includes(currentVert)){
                visited.push(currentVert);
                let edges = this.adjList[currentVert];
                for(let i=0;i<edges.length;i++){
                    queue.push(edges[i]);
                }
            }
        }
        return visited;
    }
}
let graph = new Graph();
let zeroId = graph.addVertex();
let oneId = graph.addVertex();
let twoId = graph.addVertex();
let threeId = graph.addVertex();
let fourId = graph.addVertex();

// 0 > 1 > 2 > 3 > 4

graph.addEdge(zeroId, oneId);
graph.addEdge(oneId, twoId);
graph.addEdge(twoId, threeId);
graph.addEdge(threeId, fourId);

let resultBfs = graph.bfs(2);
console.log("bfs", resultBfs);

let resultDfs = graph.dfs(2);
console.log("dfs", resultDfs);
// 1 2 0 3 4
// 1 0 2 3 4


// let result = graph.dfs(1);
// console.log(result);

// 1 2 3 4 0