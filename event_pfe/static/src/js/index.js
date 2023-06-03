

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

  pathElement.addEventListener("click", () => {

    if (popup) {
      // Hide all popups
      popups.forEach((popup) => {
        popup.classList.remove ("show");
      });

      // Show the corresponding popup
      popup.classList.add("show");
      activePopup = popup;


    }
  });

  const closeBtn = popup.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.remove("show");
      activePopup = null;
    });
  }
});
