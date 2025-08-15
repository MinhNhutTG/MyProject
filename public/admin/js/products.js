
const buttonsChangeStatus = document.querySelectorAll("[btn-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const formPath = formChangeStatus.getAttribute("data-path");
if (buttonsChangeStatus.length > 0) {
    buttonsChangeStatus.forEach((btn) => {
        btn.addEventListener("click", () => {
            const status = btn.getAttribute("data-status");
            const id = btn.getAttribute("data-id");

            const statusChange = status == "active" ? "inactive" : "active";

            const action = formPath + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();

        })
    })
}

// CHECKBOX MULTI
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

// END CHECKBOX MULTI


// FORM CHANGE MULTI
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
                if (type == "change-position"){
                   const index = item.closest("tr").querySelector("input[name='position']").value;
                   const idIndex = `${id}-${index}`;
                   ids.push(idIndex);
                }else{
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

// FORM DELETE ITEM

const buttonDeleteItem = document.querySelectorAll("[button-delete]");
if (buttonDeleteItem.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDeleteItem.forEach((item) => {
        item.addEventListener("click", () => {
            console.log(item)
            if (confirm("Bạn có muốn xóa sản phẩm này?") == true) {
                const id = item.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;

                formDeleteItem.action = action;

                formDeleteItem.submit();


            }
        })
    })
}

