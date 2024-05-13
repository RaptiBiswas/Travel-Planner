myID = document.getElementById("back_to_top");
var myScrollFunc = function() {
  var y = window.scrollY;
  if (y >= 800) {
    myID.className = "show"
  } else {
    myID.className = "hide"
  }
};
window.addEventListener("scroll", myScrollFunc);