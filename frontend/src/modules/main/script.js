//import { Request } from "../scripts/request.js";
$(document).ready(() => {
    const iniciateSound = e=>
    {
        window.audiosys.play("music1"); 
        window.removeEventListener("mousemove", iniciateSound);
    };
    window.addEventListener("click", iniciateSound);
});

