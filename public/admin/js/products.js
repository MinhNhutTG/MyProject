
const buttonsChangeStatus = document.querySelectorAll("[btn-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const formPath = formChangeStatus.getAttribute("data-path");
if (buttonsChangeStatus.length > 0){
    buttonsChangeStatus.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            const status = btn.getAttribute("data-status");
            const id = btn.getAttribute("data-id");
            
            const statusChange = status == "active" ? "inactive" : "active";

            const action = formPath + `/${statusChange}/${id}?_method=PATCH` ;
            formChangeStatus.action = action;
            formChangeStatus.submit();

        })
    })
}