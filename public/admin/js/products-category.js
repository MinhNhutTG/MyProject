// [[SCRIPT CHANGE STATUS]]
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


// [[DELETE ITEM]]
const btns = document.querySelectorAll("[btn-delete]");
const formDelete = document.querySelector("#form-delete-category");
const path = formDelete.getAttribute("data-path");
if (formDelete){
    btns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            const id = btn.getAttribute("data-delete");
            const action = `${path}/${id}?_method=DELETE`;

            formDelete.action = action;
            formDelete.submit();

        })
    })



}


// [[SCRIPT CHECKBOX MULTI]]
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
    const checkAll = checkBoxMulti.querySelector("input[name='checkall']");
    const inputsId = checkBoxMulti.querySelectorAll("input[name='id']");
    checkAll.addEventListener("click", () => {
        
        if (checkAll.checked) {
            inputsId.forEach((item) => {
                item.checked = true;
            })
        }
        else if (!checkAll.checked) {
            inputsId.forEach((item) => {
                item.checked = false;
            })
        }
    })

    inputsId.forEach((item) => {
        item.addEventListener("click", () => {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if (countChecked == inputsId.length) {
                checkAll.checked = true;
            }
            else {
                checkAll.checked = false;
            }
        })
    })

}

// [SCRIPT CHANGE MULTI]
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");

        const type = e.target.elements.type.value;

        if (type == "deleteAll") {
            const isconfirm = confirm("Bạn có muốn xóa các sản phẩm này không?");
            if (!isconfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];

            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach((item) => {
                const id = item.value;
                if (type == "change-position") {
                    const index = item.closest("tr").querySelector("input[name='position']").value;
                    const idIndex = `${id}-${index}`;
                    ids.push(idIndex);
                } else {
                    ids.push(id);
                }

            })

            inputIds.value = ids.join(", ")
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất một bảng ghi");
        }

    })
}  




const select = document.querySelector("[sort-select]");
const buttonClear = document.querySelector("[btn-reset]");
if (select) {
    const url = new URL(window.location.href);
    select.addEventListener("change", (e) => {
        const valueOption = e.target.value;
        const [keysort, valuesort] = valueOption.split("-");
        url.searchParams.set("keysort", keysort);
        url.searchParams.set("valuesort", valuesort);
        window.location.href = url;
    })

    buttonClear.addEventListener("click", () => {
        url.searchParams.delete("keysort");
        url.searchParams.delete("valuesort");
        window.location.href = url;
    })


    const keysort = url.searchParams.get("keysort");
    const valuesort = url.searchParams.get("valuesort");
    const keyvalue = `${keysort}-${valuesort}`;
    const options = document.querySelectorAll("[option-sort]");
    options.forEach((item) => {
        if (item.value == keyvalue) {
            item.setAttribute("selected", true);
        }
    })
}
