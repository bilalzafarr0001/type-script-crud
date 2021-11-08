"use strict";
var taskInput = document.getElementById("new-task");
var searchInput = document.getElementById("search-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = (document.getElementById("incomplete-tasks"));
var completedTasksHolder = (document.getElementById("completed-tasks"));
var index; // cell index
var toggleBool; // sorting asc, desc
var br = document.createElement("br");
var exist = 0;
var myArray = [];
// New Task List Item
var createNewTaskElement = function (taskString) {
    //   Create List Item
    var table_tr_side = document.createElement("tr"); //table_tr_side
    var table_td_side = document.createElement("td"); //table_td_side
    var table_td_side1 = document.createElement("td"); //table_td_side1
    //input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); // text
    //   button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //Each element needs modifying
    checkBox.type = "checkbox";
    editInput.type = "hidden";
    editButton.innerText = "Edit";
    //editButton.classList.add('btn btn-secondary', 'edit');
    editButton.className = "btn btn-secondary edit ";
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger delete ";
    label.innerText = taskString;
    myArray.push(taskString);
    console.log(myArray);
    //listItem.className="list-group-item";
    //Each element needs appending
    table_td_side.appendChild(checkBox);
    table_td_side.appendChild(label);
    table_td_side.appendChild(editInput);
    table_td_side1.appendChild(editButton);
    table_td_side1.appendChild(deleteButton);
    table_tr_side.appendChild(table_td_side);
    table_tr_side.appendChild(table_td_side1);
    console.log(table_tr_side);
    return table_tr_side;
};
$("#search-task").keyup(function () {
    // Search Text
    var search = $(this).val();
    // Hide all table tbody rows
    $("table tbody tr").hide();
    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("' + search + '")').length;
    if (len > 0) {
        $("#not_found").html("");
        // Searching text in columns and show match row
        $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(function () {
            $(this).closest("tr").show();
        });
    }
    else {
        $("#not_found").html("Record Not Found!");
    }
});
//Add a new task
var addTask = function () {
    var error = document.getElementById("error");
    console.log("Adding task...");
    //Create a new list item with the text from #new-task:
    var space = taskInput.value.trim().length == 0;
    if (!taskInput.value || taskInput.value == " " || space) {
        error.innerText = "Please Enter item to Add.";
    }
    else {
        error.innerText = "";
        var table_tr_side = createNewTaskElement(taskInput.value);
        //Append listItem to incompleteTasksHolder
        incompleteTasksHolder.appendChild(table_tr_side);
        bindTaskEvents(table_tr_side, taskCompleted);
        taskInput.value = "";
    }
};
//Edit an existing task
var editTask = function () {
    console.log("Edit task...");
    var table_td_side = this.parentNode;
    var table_td_side1 = table_td_side.previousElementSibling;
    console.log("table_td_side", table_td_side);
    console.log("table_td_side1", table_td_side1);
    var editInput = table_td_side1.getElementsByTagName("input")[1];
    var label = table_td_side1.querySelector("label");
    var containsClass = table_td_side.classList.contains("editMode");
    var editButton = table_td_side.getElementsByTagName("button")[0];
    //if the class of the parent is .editMode
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        var space = editInput.value.trim().length == 0;
        if (!editInput.value || editInput.value == " " || space) {
            alert('There must be a value to write !');
        }
        else {
            label.style.display = "inline";
            label.innerText = editInput.value;
            editButton.innerText = "Edit";
            editInput.type = "hidden";
        }
    }
    else {
        //Switch to .editMode
        //input value becomes the label's text
        editInput.type = "text";
        editInput.value = label.innerText;
        label.style.display = "none";
        editButton.innerText = "Save";
    }
    //   //Toggle .editMode on the parent
    table_td_side.classList.toggle("editMode");
};
function compareCellsD(a, b) {
    var aVal = a.cells[index].innerText;
    var bVal = b.cells[index].innerText;
    aVal = aVal.replace(/\,/g, "");
    bVal = bVal.replace(/\,/g, "");
    if (toggleBool) {
        var temp = aVal;
        aVal = bVal;
        bVal = temp;
    }
    if (aVal.match(/^[0-9]+$/) && bVal.match(/^[0-9]+$/)) {
        return parseFloat(aVal) - parseFloat(bVal);
    }
    else {
        if (aVal < bVal) {
            return 1;
        }
        else if (aVal > bVal) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
function compareCellsA(a, b) {
    var aVal = a.cells[index].innerText;
    var bVal = b.cells[index].innerText;
    aVal = aVal.replace(/\,/g, "");
    bVal = bVal.replace(/\,/g, "");
    if (toggleBool) {
        var temp = aVal;
        aVal = bVal;
        bVal = temp;
    }
    if (aVal.match(/^[0-9]+$/) && bVal.match(/^[0-9]+$/)) {
        return parseFloat(aVal) - parseFloat(bVal);
    }
    else {
        if (aVal > bVal) {
            return 1;
        }
        else if (aVal < bVal) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
function sortingD() {
    var mytbody = (document.getElementsByTagName("tbody")[0]);
    index = 0;
    // if (toggleBool) {
    //   toggleBool = false;
    // } else {
    //   toggleBool = true;
    // }
    var datas = new Array();
    var tbodyLength = mytbody.rows.length;
    for (var i = 0; i < tbodyLength; i++) {
        datas[i] = mytbody.rows[i];
    }
    // sort by cell[index]
    datas.sort(compareCellsD);
    for (var i = 0; i < mytbody.rows.length; i++) {
        // rearrange table rows by sorted rows
        mytbody.appendChild(datas[i]);
    }
    console.log(mytbody);
}
function sortingA() {
    var mytbody = (document.getElementsByTagName("tbody")[0]);
    index = 0;
    // if (toggleBool) {
    //   toggleBool = false;
    // } else {
    //   toggleBool = true;
    // }
    var datas = new Array();
    var tbodyLength = mytbody.rows.length;
    for (var i = 0; i < tbodyLength; i++) {
        datas[i] = mytbody.rows[i];
    }
    // sort by cell[index]
    datas.sort(compareCellsA);
    for (var i = 0; i < mytbody.rows.length; i++) {
        // rearrange table rows by sorted rows
        mytbody.appendChild(datas[i]);
    }
    console.log(mytbody);
}
//Sort  an existing task
var sortTask = function () {
    console.log("Sorting task...");
    myArray.sort();
    console.log(myArray);
};
//Delete an existing task
var deleteTask = function () {
    console.log("Delete task...");
    if (!confirm("Are you sure you want to del this item?")) {
        return;
    }
    else {
        var table_td_side = this.parentNode;
        var table_td_side1 = table_td_side.previousElementSibling;
        myArray.splice(myArray.indexOf(table_td_side1.children[1].innerText), 1);
        console.log(myArray);
        var tbody = table_td_side1.parentNode;
        console.log(tbody);
        tbody.removeChild(table_td_side);
        tbody.removeChild(table_td_side1);
    }
};
//Mark a task as complete
var taskCompleted = function () {
    console.log("Task complete...");
    //When the Checkbox is checked
    //Append the task list item to the #completed-tasks
    var table_td_side = this.parentNode; // inputs
    var table_td_side1 = table_td_side.nextElementSibling; // buttons
    var tbody = table_td_side.parentNode; // major tr side
    tbody.appendChild(br);
    completedTasksHolder.appendChild(tbody);
    bindTaskEvents(tbody, taskIncomplete);
};
//Mark a task as incomplete
var taskIncomplete = function () {
    console.log("Task incomplete...");
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks
    var table_td_side = this.parentNode; // inputs
    var table_td_side1 = table_td_side.nextElementSibling; // buttons
    var tbody = table_td_side.parentNode; // major tr side
    tbody.appendChild(br);
    incompleteTasksHolder.appendChild(tbody);
    bindTaskEvents(tbody, taskCompleted);
};
var bindTaskEvents = function (taskListItem, checkboxEventHandler) {
    //Select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //Bind editTask to edit button
    editButton.onclick = editTask;
    //Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //Bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkboxEventHandler;
};
//Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
//Cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //Bind events to item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
//Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //Bind events to item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
