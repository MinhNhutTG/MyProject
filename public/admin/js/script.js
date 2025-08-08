const buttonFillerStatus = document.querySelectorAll(".btn-filler-status");
if (buttonFillerStatus) {
    const url = new URL(window.location.href);
    buttonFillerStatus.forEach((btn) => {
        btn.addEventListener("click", () => {
            const statusButton = btn.getAttribute("btn-status");
            
            if (statusButton) {
                url.searchParams.set("status",statusButton);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url;
        })
    })
}
