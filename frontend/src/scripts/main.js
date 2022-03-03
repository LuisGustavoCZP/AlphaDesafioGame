import { User } from "/scripts/user.js";
window.gameuser = new User ();

window.modal = document.getElementById("modal");
window.game = document.getElementById("game");

window.gameuser.update();
