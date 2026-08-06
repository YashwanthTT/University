function addItem(){

    const input = document.getElementById("itemInput");
    const text = input.value.trim();

    if(text === ""){
        alert("Enter an item.");
        return;
    }

    const item = document.createElement("div");
    item.className = "item";

    const span = document.createElement("span");
    span.textContent = text;

    const btnDiv = document.createElement("div");
    btnDiv.className = "buttons";

    const modifyBtn = document.createElement("button");
    modifyBtn.textContent = "Modify";

    modifyBtn.onclick = function(){
       span.textContent = span.textContent.toUpperCase();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Complete";

    deleteBtn.onclick = function(){
        item.remove();
    };

    btnDiv.appendChild(modifyBtn);
    btnDiv.appendChild(deleteBtn);

    item.appendChild(span);
    item.appendChild(btnDiv);

    document.getElementById("container").appendChild(item);

    input.value = "";
}
