//import { Request } from "../scripts/request.js";
$(document).ready(() => {
    const iniciateSound = e=>
    {
        window.audiosys.play("music1"); 
        window.removeEventListener("mousemove", iniciateSound);
    };
    window.addEventListener("mousemove", iniciateSound);

    $("button").on("click", (e) => {
    
        const btn = e.target.id; //btn-XXXX
        const idBtn = btn.split("-")[1]; //Only XXXX
    
        window.audiosys.play("click");
       // $(`#Modal`).css("display","block");
        /* modal.src="modules/windows/index.html"; */

       switch (idBtn) {
           case 'ranking':
               modal.src="modules/windows/ranking/index.html";
               break;
           case 'play':
               modal.src="modules/windows/stages/";
               break;
           case 'howToPlay':
               modal.src="modules/windows/howToPlay/index.html";
               break;
           case 'setting':
                modal.src="modules/windows/sound/index.html";
               break;
           /*case 'pause':
               resultContent = contentPause();
               break;
           case 'gameOver':
               resultContent = contentGameOver();
               break;*/
           default:
               console.log("Nada");
               break;
         }
    });
});

