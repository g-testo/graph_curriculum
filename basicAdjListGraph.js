class Graph{
    constructor(){
        this.adjList=[];
    }
    addVertex(nodeId){
        this.adjList[nodeId] = [];
    }
    addEdge(nodeId1, nodeId2){
        this.adjList[nodeId1].push(nodeId2);
        this.adjList[nodeId2].push(nodeId1);
    }
    dfs(src){
        let visited=[];
        let stack=[src];
        while(stack.length > 0){
            let currentVert = stack.pop();
            if(visited.indexOf(currentVert) === -1){
                visited.push(currentVert);
                let currentAdjList = this.adjList[currentVert];
                for(let i=0;i<currentAdjList.length;i++){
                    stack.push(currentAdjList[i]);
                }                
            }
        }
        return visited;
    }
    bfs(src){
        let visited=[];
        let queue=[src];
        while(queue.length > 0){
            let currentVert = queue.shift();
            if(visited.indexOf(currentVert) === -1){
                visited.push(currentVert);
                let currentAdjList = this.adjList[currentVert];
                for(let i=0;i<currentAdjList.length;i++){
                    queue.push(currentAdjList[i]);
                }
            }
        }
        return visited;
    }
}

let graph = new Graph();

graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(1, 5);

let result = graph.bfs(0);
console.log(result);