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


const formSearch = document.querySelector("#formSearch");
if (formSearch){
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
             url.searchParams.delete("keyword");
        }
        window.location.href = url;
    })
}