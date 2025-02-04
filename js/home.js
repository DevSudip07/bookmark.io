const profilePic = document.querySelector('.profile-pic');
const profilePicForm = document.querySelector('.profile-form');
profilePic.addEventListener('click', ()=> {
    profilePicForm.style.display = 'block';
});
profilePicForm.addEventListener('mouseleave', ()=> {
    profilePicForm.style.display = 'none';
});



//  SEND IMAGE TO THE LOCAL STORAGE
const profilePicInput = document.querySelector('.profile-pic-input');
const saveButton = document.querySelector('.save-btn');

profilePicInput.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        localStorage.setItem("savedImage", reader.result);
        // alert("Image saved successfully! PLEASE RELOAD THE PAGE");
        window.location.reload();
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});
//  BRING IMAGE FROM THE LOCAL STORAGE
const img = document.querySelector(".profile-img");
const savedImage = localStorage.getItem("savedImage");

if (savedImage) {
    img.src = savedImage;
}


