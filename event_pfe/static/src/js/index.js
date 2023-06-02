
// function showPopup() {
//   var popup = document.getElementById('popup');
//   popup.classList.toggle('open');
// }
//   // document.getElementById("block231u").addEventListener("click", function
//   // () {
//   // document.getElementById("popup231u").classList.toggle("active");
//   // });
//   // document.getElementById("block231l").addEventListener("click", function
//   // () {
//   // document.getElementById("popup231l").classList.toggle("active");
//   // });

  // document.getElementById("close").addEventListener("click", function () {
  // document.getElementById("popup").classList.remove("active");
  // });

// document.getElementById("popup").addEventListener("click",showPopup())

const pathElements = document.querySelectorAll("path");
const popups = document.querySelectorAll(".popup");
let activePopup = null;

function showPopup() {
  alert("done");
}
console.log(pathElements)
Array.from(pathElements).map((pathElement) => {
  const codeAttribute = pathElement.getAttribute("code");
  const popup = document.getElementById(codeAttribute);
  if(!popup){
    return;
  }
  console.log({pathElement,codeAttribute,popup})
  pathElement.addEventListener("click", () => {

    if (popup) {
      // Hide all popups
      popups.forEach((popup) => {
        popup.style.display = "none";
      });

      // Show the corresponding popup
      popup.style.display = "block";
      activePopup = popup;


    }
  });

  const closeBtn = popup.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      popup.style.display = "none";
      activePopup = null;
    });
  }
});







// document.addEventListener("click", (event) => {
//   const targetElement = event.target;

//   // Check if the clicked element is outside of any popup
//   const isOutsidePopup = Array.from(popups).every((popup) => {
//     return !popup.contains(targetElement);
//   });

//   if (isOutsidePopup) {
//     // Hide all popups
//     popups.forEach((popup) => {
//       popup.style.display = "none";
//     });
//   }
// });