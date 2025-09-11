

const btns = document.querySelectorAll("[btn-delete-permission]");

if (btns.length > 0) {

    const formPermission = document.querySelector("#form-delete-permission");
    const path = formPermission.getAttribute("data-path");

    btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = btn.getAttribute("data-id");

            const action = `${path}/${id}?_method=DELETE`;

            formPermission.action = action;
            formPermission.submit();

        })

    })
}

// PERMISSION
const tablePermission = document.querySelector("#table-permission");
if (tablePermission) {
    const buttonSubmit = document.querySelector("#buttonSubmit");
    let permission = [];

    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        const rows = tablePermission.querySelectorAll("[data-name]");


        rows.forEach((row) => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if (name == "id") {
                inputs.forEach((input) => {
                    const id = input.value;
                    permission.push({
                        id: id,
                        permission: []
                    })
                })

            }
            else {
                inputs.forEach((input, index) => { 
                    if (input.checked){
                        permission[index].permission.push(name);
                    }
                    
                })
            }
        })
        if (permission.length > 0 ){
            const form = document.querySelector("#form-change-permission");
            const input = form.querySelector("input[name='permission']");
            input.value =  JSON.stringify(permission)
            form.submit();
        }
        
    })

}


// PERMISSION DEFAULT 
const dataRecord = document.querySelector("[data-record]");
if (dataRecord){
    const records = JSON.parse(dataRecord.getAttribute("data-record"));
    const tablePermissions = document.querySelector("#table-permission");
    
    records.forEach((records,index) =>{
        const permissions = records.permission;

        permissions.forEach((permission)=>{
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        })
        
    })
}
