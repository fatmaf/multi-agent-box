// 4 connected grid 

class Graph {
    constructor()
    {
        this._map = new Map();
        this.root=null;
    }
    addVertex(vertex){
        if (this.root==null)
        {
            this.root = vertex;
        }
        if (!(this._map.has(vertex)))
        {
            this._map.set(vertex,[]);
        }
    }
    getRoot()
    {
        return this.root;
    }
    hasVertex(vertex){
        return this._map.has(vertex);
    }
    addDirectedEdge(src,dest){
        if (!(this.hasVertex(src)))
        {
            this.addVertex(src);
        }
        if(!this.hasVertex(dest))
        {
            this.addVertex(dest);
        }
this.addEdgeRaw(src,dest);
        
    }
    addEdge(src,dest){
        if (!(this.hasVertex(src)))
        {
            this.addVertex(src);
        }
        if(!this.hasVertex(dest))
        {
            this.addVertex(dest);
        }

this.addEdgeRaw(src,dest);
this.addEdgeRaw(dest,src);
        
    }
    addEdgeRaw(src,dest)
    {
        let src_list = this._map.get(src); 
        src_list.push(dest); 
        this._map.set(src,src_list);
    }
    getEdges(src){
        if(this.hasVertex(src))
        {
            return this._map.get(src);
        }
        else{
            return [];
        }
    }



}

function doBFS(test_graph)
{

    let visited = [];
    let tovisit = [test_graph.root];
    while(tovisit.length>0)
    {
        let current_v = tovisit.pop();
        if(!visited.includes(current_v)){
        visited.push(current_v); 
        console.log(current_v);
        
        let edges = test_graph.getEdges(current_v);
        for (const edge of edges)
        {
            if (!tovisit.includes(edge) && !visited.includes(edge))
            {
                tovisit.push(edge);
            }
        }


    }
}
}


function testGraph()
{
    let test_graph = new Graph(); 
    test_graph.addEdge(1,2);
    test_graph.addEdge(2,3);
    test_graph.addEdge(1,3);
    doBFS(test_graph);
    return test_graph;
}

function drawGraph()
{
    testGraph();
}

drawGraph();
console.log("blah");