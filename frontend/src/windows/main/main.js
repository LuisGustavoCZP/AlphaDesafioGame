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
               parent.modal.src="windows/ranking/";
               break;
           case 'play':
                parent.modal.src="windows/stages/";
               break;
           case 'howToPlay':
                parent.modal.src="windows/help/";
               break;
           case 'setting':
                parent.modal.src="windows/settings/";
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