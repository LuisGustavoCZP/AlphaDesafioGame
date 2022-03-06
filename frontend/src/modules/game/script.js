//import { Request } from "../scripts/request.js";
$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    window.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        console.log(bookcase);
        bookcase.start();
        window.modal.src="";
    }, 5000);

    //window.transition.stop();
});

