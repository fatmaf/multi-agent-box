

function attach_update_grid_to_elems()
{
     document.getElementById("sview_edit_bar_rows_text").addEventListener("input",update_grid);
    document.getElementById("sview_edit_bar_cols_text").addEventListener("input",update_grid);
    document.getElementById("sview_edit_bar_reset").addEventListener("click",update_grid);
    
}
function get_number_input_elem_value(elem_id)
{
    const elem = document.getElementById(elem_id); 
    return Number(elem.value);
}

function update_grid()
{
    const num_rows = get_number_input_elem_value("sview_edit_bar_rows_text");
    console.log(`rows: ${num_rows}`);
    const num_cols = get_number_input_elem_value("sview_edit_bar_cols_text"); 
    console.log(`cols: ${num_cols}`);
    const old_elem = document.getElementById("sview_grid_view");
    const updated_elem = document.createElement("div"); 
    updated_elem.id=old_elem.id;
    update_grid_rows_cols(updated_elem,num_rows,num_cols);
    const outer_elem = document.getElementById("sview_grid");
    outer_elem.replaceChild(updated_elem,old_elem)

}
function update_grid_rows_cols(div_elem,max_rows,max_cols)
{
    const grid_rows_max = max_rows +1 
    const grid_cols_max = max_cols +1
    div_elem.style.setProperty(`grid-template`, `repeat(${grid_rows_max},auto) / repeat(${grid_cols_max},auto)`);
    for (let row = 0; row < grid_rows_max; row++) {
        for (let col = 0; col < grid_cols_max; col++) {
            let cell_elem; 
            if(row == 0 || col==0)
            {
             cell_elem = create_cell_label_elem('cell',row,col);   
            }
            else
            {
                cell_elem=create_grid_cell_element('cell',row,col);
            }
            div_elem.appendChild(cell_elem);

        }

    }

}

function cell_click_event(event){
    console.log(`Cell clicked: ${event.target.id}`);
    // check if any of the radio buttons are checked 
    const checked_state = get_selected_state(); 
    if (checked_state!=null)
    {
        update_elem_state(event.target,checked_state);
    }
}
function update_elem_state(cell_elem, new_state)
{
    const current_state = cell_elem.classList.item(1);
    cell_elem.classList.remove(current_state); 
    const new_state_name = `cell_state_${new_state.toLowerCase()}`
    cell_elem.classList.add(new_state_name);
}
function get_selected_state()
{
    const possible_states = document.getElementsByName("sview_edit_bar_mark_cell"); 
    for (const state of possible_states)
    {
        if ((state.type == "radio") && (state.checked))
        {
            return state.value;
        }
    }
    return null;
}
function create_grid_cell_element(id_prefix,row_num,col_num)
{
    let cell_elem = document.createElement("div");
    // cell_elem.className="grid_cell";
    cell_elem.classList.add("grid_cell");
    cell_elem.classList.add("cell_state_empty");
    cell_elem.id = `${id_prefix}-${row_num}-${col_num}`;
    cell_elem.addEventListener("click", cell_click_event);
    return cell_elem;
}

function create_cell_label_elem(id_prefix,row_num,col_num)
{
    let cell_elem=document.createElement("div"); 
    cell_elem.className="grid_label"; 
    cell_elem.id=`${id_prefix}-label-${row_num}-${col_num}`;
    cell_elem.innerText=`${row_num}-${col_num}`;
    return cell_elem;

}

function save_grid()
{
    //save all grid elements to a json file 
    
}

export {update_grid,attach_update_grid_to_elems};