import { User } from "/scripts/user.js";
const waitTime = 10;
const user = new User ();
window.gameuser = user;

window.audiosys = document.getElementById("audiosys");
window.modal = document.getElementById("modal");
window.modal.src = "modules/splash"
window.game = document.getElementById("game");
window.transition = document.getElementById("transition");

setTimeout(() => { user.update() }, waitTime*1000);
