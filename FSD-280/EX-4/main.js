const form = document.getElementById("myForm");
const userList = document.getElementById("userList");

form.addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let phone = document.getElementById("phone").value.trim();

   
    if(name.length < 4){
        alert("Name should contain at least 4 characters.");
        return;
    }

    if(name.charAt(0) !== name.charAt(0).toUpperCase()){
        alert("First letter of name should be uppercase.");
        return;
    }

   
    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }


    if(!/^[0-9]{10}$/.test(phone)){
        alert("Phone number must contain exactly 10 digits.");
        return;
    }

  
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = `${name.toUpperCase()} - ${phone}`;


    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "actionBtn";

    deleteBtn.onclick = function(){
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    userList.appendChild(li);

    form.reset();

});
