
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

