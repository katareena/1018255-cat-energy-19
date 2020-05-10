document.getElementById("dropdown").classList.remove("main-nav__list--open");

function myFunction() {
  document.getElementById("dropdown").classList.toggle("main-nav__list--open");
  document.getElementById("close").classList.toggle("burger__close");
}

window.onclick = function(event) {
  if (!event.target.matches('.burger')) {
    var dropdowns = document.getElementsByClassName("main-nav__list");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('main-nav__list--open')) {
        openDropdown.classList.remove('main-nav__list--open');
      }
    }
  }
}
