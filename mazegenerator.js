class Graph{
    constructor(width, height){
        this.height = height;
        this.width = width;
        this.boardSize = width*height;
        this.adjList = [];
        let visitedArr=[];

        for(let i=0;i<this.boardSize;i++){
            this.adjList[i] = [];

            let edges=[];
            let top = i-height;
            let right = i+1;
            let bottom = i+height;
            let left = i-1;

            let row = Math.floor(i/height);
            let rightRow = Math.floor(right/height);
            let leftRow = Math.floor(left/height);
            
            if(top>=0)edges.push(top);
            if(rightRow === row)edges.push(right);
            if(bottom<this.boardSize)edges.push(bottom);
            if(leftRow === row)edges.push(left);

            this.adjList[i] = edges;
        }
        let tempAdjList = [...this.adjList];
        let currentCell = Math.floor(Math.random()*this.boardSize);
        let path = [ currentCell ];

        while(path.length > 0){
            let neighbors = tempAdjList[currentCell].filter((vertex)=>visitedArr.indexOf(vertex) === -1);
            if(neighbors.length > 0){
                let next = neighbors[Math.floor(Math.random()*neighbors.length)];

                tempAdjList[currentCell] = tempAdjList[currentCell].filter((vertex)=>vertex !== next);
                tempAdjList[next] = tempAdjList[next].filter((vertex)=>vertex !== currentCell);

                visitedArr.push(next);
                currentCell = next;
                path.push(currentCell);
            } else {
                currentCell = path.pop();
            }
        }
        for(let i=0;i<this.adjList.length;i++){
            this.adjList[i] = this.adjList[i].filter((edge)=>tempAdjList[i].indexOf(edge) === -1);
        }
    }
    addEdge(vertex1, vertex2){
        this.adjList[vertex1].push(vertex2);
        this.adjList[vertex2].push(vertex1);
    }
    visualize(){
        let hasEdgeArr = [];
        for(let i=0;i<this.adjList.length;i++){
            let top = i-this.height;
            let right = i+1;
            let bottom = i+this.height;
            let left = i-1;

            let row = Math.floor(i/this.height);
            let rightRow = Math.floor(right/this.height);
            let leftRow = Math.floor(left/this.height);
            let currentVertexEdges = [];

            if(!hasEdgeArr[row]){
                hasEdgeArr[row]=[];
            } 

            if(this.adjList[i].indexOf(top) !== -1){
                currentVertexEdges.push(0);
            } else {
                currentVertexEdges.push(1);
            }
            if(this.adjList[i].indexOf(right) !== -1){
                currentVertexEdges.push(0);
            } else {
                currentVertexEdges.push(1);
            }
            if(this.adjList[i].indexOf(bottom) !== -1){
                currentVertexEdges.push(0);
            } else {
                currentVertexEdges.push(1);
            }
            if(this.adjList[i].indexOf(left) !== -1){
                currentVertexEdges.push(0);
            } else {
                currentVertexEdges.push(1);
            }
            hasEdgeArr[row][i%this.width] = currentVertexEdges;
        }
        return hasEdgeArr;
    }
    bfs(src, dest){
        let visited=[];
        let queue=[src];
        let predecessor = {};
        while(queue.length > 0){
            let currentVertex = queue.shift();
            if(visited.indexOf(currentVertex) === -1){
                visited.push(currentVertex);
                let edges = this.adjList[currentVertex];
                for(let i=0;i<edges.length;i++){
                    queue.push(edges[i]);
                    predecessor[edges[i]] ? predecessor[edges[i]].push(currentVertex) : predecessor[edges[i]] = [currentVertex];
                    if (visited[edges[i]]) {
                        continue;
                    }
                    if (edges[i] === dest) {
                        let path = [ edges[i] ];
                        while (currentVertex !== src) {
                            path.push(currentVertex);
                            currentVertex = predecessor[currentVertex][0];          
                        }
                        path.push(src);
                        path.reverse();
                        return path;
                    }
                }
            }
        }
    }
}

// let graph = new Graph(5,5); 
// let path = graph.bfs(0, 24);
// console.log(graph);
// console.log(path);