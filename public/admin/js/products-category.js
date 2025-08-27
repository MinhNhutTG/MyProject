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


// const formChangeMulti = document.querySelector("[form-change-status-category]")
// if (formChangeMulti) {
//     formChangeMulti.addEventListener("submit", (e) => {
//         e.preventDefault();
        
//         const checkBoxMulti = document.querySelector("[checkbox-multi]");
//         const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");

//         const type = e.target.elements.type.value;

//         if (type == "deleteAll") {
//             const isconfirm = confirm("Bạn có muốn xóa các sản phẩm này không?");
//             if (!isconfirm) {
//                 return;
//             }
//         }

//         if (inputsChecked.length > 0) {
//             let ids = [];

//             const inputIds = formChangeMulti.querySelector("input[name='ids']");

//             inputsChecked.forEach((item) => {
//                 const id = item.value;
//                 if (type == "change-position") {
//                     const index = item.closest("tr").querySelector("input[name='position']").value;
//                     const idIndex = `${id}-${index}`;
//                     ids.push(idIndex);
//                 } else {
//                     ids.push(id);
//                 }

//             })

//             inputIds.value = ids.join(", ")
//             console.log(inputIds.value)
//             formChangeMulti.submit();
//         }
//         else {
//             alert("Vui lòng chọn ít nhất một bảng ghi");
//         }

//     })
// }