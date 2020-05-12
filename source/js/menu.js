document.querySelector(".main-nav").classList.remove("main-nav--open");
document.querySelector(".burger").classList.remove("burger--hidden");

function myFunction() {
  document.querySelector(".main-nav").classList.toggle("main-nav--open");
  document.querySelector(".burger").classList.toggle("burger--close");
}

window.onclick = function(event) {
  if (!event.target.matches(".burger")) {
    var dropdowns = document.getElementsByClassName("main-nav");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('main-nav--open')) {
        openDropdown.classList.remove('main-nav--open');
        document.querySelector(".burger").classList.toggle("burger--close");
      }
    }
  }
}
