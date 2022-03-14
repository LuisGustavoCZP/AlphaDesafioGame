$(document).ready(() => 
{
    $("button").on("click", (e) => {
    
        const btn = e.target.id; //btn-XXXX
        const idBtn = btn.split("-")[1]; //Only XXXX
    
        parent.audiosys.play("click");
       // $(`#Modal`).css("display","block");
        /* modal.src="modules/windows/index.html"; */

       switch (idBtn) {
           case 'ranking':
               parent.modal.src="modules/windows/ranking/index.html";
               break;
           case 'play':
                parent.modal.src="modules/windows/stages/";
               break;
           case 'howToPlay':
                parent.modal.src="modules/windows/howToPlay/index.html";
               break;
           case 'setting':
                parent.modal.src="modules/windows/sound/index.html";
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