// 4 connected grid 

function getLinearIndex(row, col, max_cols) {
    return ((row * max_cols) + col);
}
function getRowCol(linearIndex, max_cols) {
    const col = linearIndex % max_cols;
    const row = (linearIndex - col) / max_cols;
    return [row, col];
}
function getNeighbors(row_num, col_num) {
    // 4 connected neighbors 
    return [
        [row_num, col_num - 1],
        [row_num, col_num + 1],
        [row_num - 1, col_num],
        [row_num + 1, col_num]
    ]
}
function clipNeighbors(neighbors, max_rows, max_cols) {
    let clipped = [];
    const row_index = 0;
    const col_index = 1;
    for (let i = 0; i < neighbors.length; i++) {
        const xy = neighbors[i];
        const row = xy[row_index];
        const col = xy[col_index];
        if ((row >= 0 && row < max_rows) && (col >= 0 && col < max_cols)) {
            clipped.push(xy);
        }
    }
    return clipped;
}

class GridGraph {
    constructor(max_rows = 0, max_cols = 0, graph_name = "default") {
        this.max_cols = max_cols;
        this.max_rows = max_rows;
        this._map = new Map();
        this.root = null;
        this._name = `graph-${graph_name}-${max_rows}r-${max_cols}c`;
        // a 2x2 grid to a graph 
        let rows = this.max_rows;
        let cols = this.max_cols;
        // for each cell get its neighbors 
        // add them to the graph 
        // index = linear 

        for (let row = 0; row < this.max_rows; row++) {
            for (let col = 0; col < this.max_cols; col++) {
                const nodeNum = getLinearIndex(row, col, this.max_cols);
                const neighbors = clipNeighbors(getNeighbors(row, col), rows, cols);
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const destNum = getLinearIndex(neighbor[0], neighbor[1], cols);
                    this.addEdge(nodeNum, destNum);
                }
            }
        }

    }

    getGrid() {
        let grid = [...Array(this.max_rows).keys()].map(i => Array(this.max_cols));
        // go over the graph vertices and add them 
        for (let linIndex in [...this._map.keys()]) {
            let rowcol = getRowCol(linIndex, this.max_cols);
            grid[rowcol[0]][rowcol[1]] = linIndex;
        }
        return grid;

    }
    getName() {
        return this._name;
    }
    addVertex(vertex) {
        if (this.root == null) {
            this.root = vertex;
        }
        if (!(this._map.has(vertex))) {
            this._map.set(vertex, []);
        }
    }
    getRoot() {
        return this.root;
    }
    hasVertex(vertex) {
        return this._map.has(vertex);
    }
    addDirectedEdge(src, dest) {
        if (!(this.hasVertex(src))) {
            this.addVertex(src);
        }
        if (!this.hasVertex(dest)) {
            this.addVertex(dest);
        }
        this.addEdgeRaw(src, dest);

    }
    addEdge(src, dest) {
        if (!(this.hasVertex(src))) {
            this.addVertex(src);
        }
        if (!this.hasVertex(dest)) {
            this.addVertex(dest);
        }

        this.addEdgeRaw(src, dest);
        this.addEdgeRaw(dest, src);

    }
    addEdgeRaw(src, dest) {
        let src_list = this._map.get(src);
        if (!src_list.includes(dest)) {
            src_list.push(dest);
            this._map.set(src, src_list);
        }
    }
    getEdges(src) {
        if (this.hasVertex(src)) {
            return this._map.get(src);
        }
        else {
            return [];
        }
    }
    getCellName(cell_row, cell_col) {
        const cell_ind = getLinearIndex(cell_row, cell_col, this.max_cols);
        return this.getCellNameLin(cell_ind);

    }
    getCellNameLin(cell_ind) {
        return `${this._name}-${cell_ind}`;
    }
}
function doBFS(test_graph) {
    doDFSOrBFS(test_graph, true);
}
function doDFS(test_graph) {
    doDFSOrBFS(test_graph, false);
}
function doDFSOrBFS(test_graph, doBFS = false, doColor = true) {

    let visited = [];
    let tovisit = [test_graph.root];
    let node_counter = 0;
    while (tovisit.length > 0) {
        let current_v;
        if (doBFS) {
            current_v = tovisit.shift();
        }
        else { current_v = tovisit.pop() };

        if (!visited.includes(current_v)) {
            node_counter += 1;
            visited.push(current_v);
            console.log(current_v);
            if (doColor) {
                const cell_elem_id = test_graph.getCellNameLin(current_v);
                setTimeout(colorElem, node_counter * 1000, cell_elem_id, "pink");
            }
            let edges = test_graph.getEdges(current_v);
            for (const edge of edges) {
                if (!tovisit.includes(edge) && !visited.includes(edge)) {
                    tovisit.push(edge);
                }
            }

        }
    }
}

function colorElem(elem_id, color_value = "white") {

    const elem = document.getElementById(elem_id);
    elem.style.backgroundColor = color_value;
    console.log(`Changing color of elem ${elem_id}`);
}
function addGridElem(test_graph) {

    let div_elem = document.getElementById("textgrapher");
    let graph_array = test_graph.getGrid();
    const num_rows = graph_array.length;
    if (num_rows > 0) {
        const num_cols = graph_array[0].length;
        div_elem.style.setProperty(`grid-template`, `repeat(${num_rows + 1},auto) / repeat(${num_cols + 1},auto)`);
        for (let row = 0; row < num_rows + 1; row++) {
            for (let col = 0; col < num_cols + 1; col++) {
                let cell_elem = document.createElement("div");
                cell_elem.style.display="flex";
                cell_elem.style.justifyContent="center";
                cell_elem.style.alignItems="center";
                const cell_row = row - 1;
                const cell_col = col - 1;
                // first row is header 
                // first col is also header 
                if (row == 0) {
                    if (col > 0) {
                        cell_elem.innerText = `${cell_col}`;
                    }
                }
                else if (col == 0) {

if (row > 0) {
                        cell_elem.innerText = `${cell_row}`;
                    }
                }
                else {

                    cell_elem.id = test_graph.getCellName(cell_row, cell_col);
                    cell_elem.addEventListener("click", (event) => {
                        console.log(`Cell clicked: ${event.target.id}`);
                    });
                }

                div_elem.appendChild(cell_elem);

            }

        }
    }

}
function testGraph() {
    let test_graph = new GridGraph(5, 5);

    addGridElem(test_graph);
    console.log("BFS");
    doBFS(test_graph);
    console.log("DFS");
    doDFS(test_graph);
    return test_graph;
}

function drawGraph() {
    testGraph();
}

drawGraph();
console.log("blah");