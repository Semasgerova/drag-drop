const dragDrop = document.querySelector(".drag-drop");
const input = document.querySelector(".file input");
const images = document.querySelector(".file .images");

let file;

dragDrop.addEventListener("click", () => {
  input.click();
});

input.addEventListener('change',function(){
    file = this.files[0];
    displayFile();
})

dragDrop.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragDrop.classList.add("active");
});

dragDrop.addEventListener("dragleave", () => {
  dragDrop.classList.remove("active");
});

dragDrop.addEventListener("drop", (e) => {
  e.preventDefault();
  dragDrop.classList.remove("active");
  file = e.dataTransfer.files[0];
  displayFile()
  
});

const upload = document.querySelector('.file .btn');
upload.addEventListener('click',()=>{
    if(images.innerHTML===''){
      alert('Please browse a file')
    }else{
      images.innerHTML='';
    }
    
})

function displayFile(){
    let fileType = file.type;

  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let img = `<div class="box"><div class="img"><img src="${fileURL}"> <div class="text"><h4>${file.name}</h4> <p>image <span></span> ${file.size} <span></span> ${file.type.substring(6)} </p></div> </div><i class="fa-solid fa-xmark"></i></div>`;
      images.innerHTML += img;
      const deleteButtons = document.querySelectorAll(".file .images .box i");
      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
          deleteButton.parentElement.remove();
        });
      });
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This file is not an image");
  }
}
