function before() {
  document.querySelector(".slider__catafter-img").classList.toggle("hide");
  document.querySelector(".slider__catbefore-img").classList.toggle("show");
  document.querySelector(".slider__catbefore-img").classList.remove("hide");
  document.querySelector(".slider__catafter-img").classList.remove("show");
}

function after() {
  document.querySelector(".slider__catbefore-img").classList.toggle("hide");
  document.querySelector(".slider__catafter-img").classList.toggle("show");
  document.querySelector(".slider__catafter-img").classList.remove("hide");
  document.querySelector(".slider__catbefore-img").classList.remove("show");
}
