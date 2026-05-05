const darkmode = document.querySelector(".darkmode");
const whitemode = document.querySelector(".whitemode");
const icon0 = document.querySelector(".icon0");
const icon1 = document.querySelector(".icon1");
const icon2 = document.querySelector(".icon2");
const icon3 = document.querySelector(".icon3");
darkmode.addEventListener("click", () => {
  icon0.src = "../const/sun-alt-svgrepo-com-darkmode.svg";
  icon1.src = "../const/moon-svgrepo-com-darkmode.svg";
  icon2.src = "../const/shopping-cart-02-svgrepo-com-darkmode2.svg";
  icon3.src = "../const/personal-svgrepo-com-darkmode04.svg";
});
whitemode.addEventListener("click", () => {
  icon0.src = "../const/sun-alt-svgrepo-com.svg";
  icon1.src = "../const/moon-svgrepo-com.svg";
  icon2.src = "../const/cart-svgrepo-com (2).svg";
  icon3.src = "../const/profile-1341-svgrepo-com.svg";
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  icon0.src = "../const/sun-alt-svgrepo-com-darkmode.svg";
  icon1.src = "../const/moon-svgrepo-com-darkmode.svg";
  icon2.src = "../const/shopping-cart-02-svgrepo-com-darkmode2.svg";
  icon3.src = "../const/personal-svgrepo-com-darkmode04.svg";
}
if (savedTheme === "light") {
  icon0.src = "../const/sun-alt-svgrepo-com.svg";
  icon1.src = "../const/moon-svgrepo-com.svg";
  icon2.src = "../const/cart-svgrepo-com (2).svg";
  icon3.src = "../const/profile-1341-svgrepo-com.svg";
}
darkmode.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
});
whitemode.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
});
