// const navMenu = document.querySelector(".icon");

// const links = document.querySelector(".main_nav");

// navToggle.addEventListener('click', function(){
//     links.classList.toggle("show_nav");
// })
var x = document.getElementById("nav_option");
function myFunction() {
    if (x.className === "navigation_option") {
        x.className += " responsive";
    } else {
        x.className = "navigation_option";
    }
}

const nav = document.querySelector(".icon");

nav.addEventListener('mouseover', function () {
    x.className = "navigation_option responsive";
    setTimeout(() => {
        x.className = "navigation_option";
    }, 3000);
}
);

