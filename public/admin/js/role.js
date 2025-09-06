

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