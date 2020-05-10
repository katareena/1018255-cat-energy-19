document.getElementById("dropdown").classList.remove("main-nav--open");

function myFunction() {
  document.getElementById("dropdown").classList.toggle("main-nav--open");
  document.getElementById("close").classList.toggle("burger__close");
}

window.onclick = function(event) {
  if (!event.target.matches('.burger')) {
    var dropdowns = document.getElementsByClassName("main-nav__list");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('main-nav--open')) {
        openDropdown.classList.remove('main-nav--open');
      }
    }
  }
}
