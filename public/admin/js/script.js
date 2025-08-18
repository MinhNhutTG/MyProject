//==========[[ SCRIPT FILTER STATUS ]] ============
const buttonFillerStatus = document.querySelectorAll(".btn-filler-status");
if (buttonFillerStatus){
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

//==========[[ SCRIPT FORM SEARCH ]] ============
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

//==========[[ SCRIPT PAGINATION ]] ============
const btnPagination = document.querySelectorAll("[btn-pagination]");
btnPagination.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        const url = new URL(window.location.href);
        const value = btn.getAttribute("btn-pagination");
        if (Number(value) > 0){
              url.searchParams.set("page",value);
        }
        else{
              url.searchParams.delete("page");
        }
        window.location.href = url;
    })
    
})

//==========[[ SCRIPT SHOW-ALERT ]] ============
const showAlert = document.querySelector("[show-alert]");
if (showAlert){
    console.log(showAlert)
    const timeout =  showAlert.getAttribute("data-time");
    const closeMark = showAlert.querySelector(".close-mark");

    closeMark.addEventListener("click",()=>{
         showAlert.classList.add("d-none");
    })

    setTimeout(() => {
        showAlert.classList.add("d-none");
    }, timeout);

}


//===========[[ UPLOAD IMAGES REVIEW ]] =======
const uploadImage = document.querySelector("[upload-images]");
const  uploadImageInput = document.querySelector("[upload-images-input]");
const uploadImageReview = document.querySelector("[upload-images-review]");
let spanCloseImage = document.querySelector("[close-image]");

if (uploadImage){
    uploadImageInput.addEventListener("change",(e)=>{
        
        console.log(e)
        const file = e.target.files[0];
        if (file){
            uploadImageReview.src = URL.createObjectURL(file);
            spanCloseImage.classList.remove("d-none");
            spanCloseImage.classList.add("d-block");
        }
    })
}

spanCloseImage.addEventListener("click",()=>{
    uploadImageReview.src = ""
    spanCloseImage.classList.remove("d-block");
    spanCloseImage.classList.add("d-none");
})