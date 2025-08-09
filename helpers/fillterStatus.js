module.exports = (query) => {
    let fillerButton = [
        {
            name: "Tất cả",
            class: "active",
            status: ""
        },
        {
            name: "Đang hoạt động",
            class: "",
            status: "active"
        },
        {
            name: "Ngưng hoạt động",
            class: "",
            status: "inactive"
        }
    ]
    if (query.status) {
        const index = fillerButton.findIndex((btn) => btn.status == query.status);
        fillerButton[index].class = "btn-success";
    }
    else {
        const index = fillerButton.findIndex((btn) => btn.status == "");
        fillerButton[index].class = "btn-success";
    }
    return fillerButton;
}