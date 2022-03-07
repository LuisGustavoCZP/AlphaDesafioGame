//import { Request } from "../scripts/request.js";
$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron")[0];
    if(window.modal) window.modal.src="modules/windows/stage";
    /* parent.audiosys.play("stop"); */
    setTimeout(() => 
    {
        console.log(bookcase);
        bookcase.start();
        if(window.modal){
            window.modal.src="";
            parent.audiosys.play("open");
        }
        cauldron.start();
    }, 5000);

    //window.transition.stop();
});

