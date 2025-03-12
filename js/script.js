//  DISPLAY THE FORM
const navButton = document.querySelector('.nav-btn');
const nav = document.querySelector('header');

navButton.addEventListener('click', ()=> {
    form.style.zIndex = '99';
    nav.style.opacity = '0%';
});

// .html থাকলে সরিয়ে ফেলবে
if (window.location.pathname.endsWith(".html")) {
    window.history.replaceState(null, "", window.location.pathname.replace(".html", ""));
}
