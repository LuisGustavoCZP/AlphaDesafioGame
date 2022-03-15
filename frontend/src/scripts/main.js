import { User } from "/scripts/user.js";

const user = new User ();
window.gameuser = user;

window.audiosys = document.getElementById("audiosys");
window.modal = document.getElementById("modal");
window.game = document.getElementById("game");
window.transition = document.getElementById("transition");

const iniciateSound = e=>
{
    window.audiosys.play("music1"); 
    window.removeEventListener("mousemove", iniciateSound);
};
window.addEventListener("click", iniciateSound);

user.update();