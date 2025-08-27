//==========[[ SCRIPT FILTER STATUS ]] ============
const buttonFillerStatus = document.querySelectorAll(".btn-filler-status");
if (buttonFillerStatus) {
    const url = new URL(window.location.href);
    buttonFillerStatus.forEach((btn) => {
        btn.addEventListener("click", () => {
            const statusButton = btn.getAttribute("btn-status");

            if (statusButton) {
                url.searchParams.set("status", statusButton);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url;
        })
    })
}

//==========[[ SCRIPT FORM SEARCH ]] ============
const formSearch = document.querySelector("#formSearch");
if (formSearch) {
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url;
    })
}

//==========[[ SCRIPT PAGINATION ]] ============
const btnPagination = document.querySelectorAll("[btn-pagination]");
btnPagination.forEach((btn) => {
    btn.addEventListener("click", () => {
        const url = new URL(window.location.href);
        const value = btn.getAttribute("btn-pagination");
        if (Number(value) > 0) {
            url.searchParams.set("page", value);
        }
        else {
            url.searchParams.delete("page");
        }
        window.location.href = url;
    })

})

//==========[[ SCRIPT SHOW-ALERT ]] ============
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    console.log(showAlert)
    const timeout = showAlert.getAttribute("data-time");
    const closeMark = showAlert.querySelector(".close-mark");

    closeMark.addEventListener("click", () => {
        showAlert.classList.add("d-none");
    })

    setTimeout(() => {
        showAlert.classList.add("d-none");
    }, timeout);

}


//===========[[ UPLOAD IMAGES REVIEW ]] =======
const uploadImage = document.querySelector("[upload-images]");
const uploadImageInput = document.querySelector("[upload-images-input]");
const uploadImageReview = document.querySelector("[upload-images-review]");
let spanCloseImage = document.querySelector("[close-image]");

if (uploadImage) {
    uploadImageInput.addEventListener("change", (e) => {

        console.log(e)
        const file = e.target.files[0];
        if (file) {
            uploadImageReview.src = URL.createObjectURL(file);
            spanCloseImage.classList.remove("d-none");
            spanCloseImage.classList.add("d-block");
        }
    })
    spanCloseImage.addEventListener("click", () => {
        uploadImageReview.src = ""
        spanCloseImage.classList.remove("d-block");
        spanCloseImage.classList.add("d-none");
    })


}


// SORT PRODUCT
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
                if (type == "change-position") {
                    const index = item.closest("tr").querySelector("input[name='position']").value;
                    const idIndex = `${id}-${index}`;
                    ids.push(idIndex);
                } else {
                    ids.push(id);
                }

            })

            inputIds.value = ids.join(", ")
            console.log(inputIds.value)
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất một bảng ghi");
        }

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
