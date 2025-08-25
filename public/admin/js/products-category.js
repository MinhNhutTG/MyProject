// [[CHANGE STATUS]]
const btnchangeStatus = document.querySelectorAll("[btn-changeStatus]");
const formChangeStatus = document.querySelector("#form-change-status");
if (btnchangeStatus.length > 0){
    btnchangeStatus.forEach((btn)=>{
        
        btn.addEventListener("click",()=>{

            const id = btn.getAttribute("data-id");
            const status = btn.getAttribute("data");

            const statusChange =  status == "active"? "inactive":"active";

            const action = `${formChangeStatus.getAttribute("data-path")}/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}