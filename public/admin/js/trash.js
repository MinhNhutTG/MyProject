
const buttonRestore = document.querySelectorAll("[button-restore]");
if (buttonRestore.length > 0){
    const formRestoreProduct = document.querySelector("#form-restore-item");
    const path = formRestoreProduct.getAttribute("data-path");
    buttonRestore.forEach((item)=>{
        item.addEventListener("click",()=>{
            const id = item.getAttribute("data-id");
            
            const action = `${path}/${id}?_method=PATCH`;

            formRestoreProduct.action = action;

            formRestoreProduct.submit();

        })
    })
}