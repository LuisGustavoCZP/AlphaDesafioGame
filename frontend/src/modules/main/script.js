//import { Request } from "../scripts/request.js";
$(document).ready(() => {
    $("button").on("click", (e) => {
    
        const btn = e.target.id; //btn-XXXX
        const idBtn = btn.split("-")[1]; //Only XXXX
    
       // $(`#Modal`).css("display","block");
        modal.src="modules/windows/index.html";

       switch (idBtn) {
           case 'ranking':
               modal.src="modules/windows/index.html";
               break;
           case 'play':
               modal.src="modules/windows/login/";
               break;
           case 'howToPlay':
               modal.src="modules/windows/index.html";
               break;
           /*case 'setting':
               resultContent = contentSetting();
               break;
           case 'pause':
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

