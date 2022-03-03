//import { Request } from "../scripts/request.js";
$(document).ready(function() {
    $("button").on("click", (e) => {
    
        const btn = e.target.id; //btn-XXXX
        const idBtn = btn.split("-")[1]; //Only XXXX
    
       // console.log(btn + " - " + idBtn);
        modal.src="modules/windows/index.html";

        switch (idBtn) {
            case 'ranking':
                modal.src="modules/windows/ranking.html";
                break;
            case 'play':
                modal.src="modules/windows/login.html";
                break;
            case 'howToPlay':
                modal.src="modules/windows/howToPlay.html";
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

