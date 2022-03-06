//import { Request } from "../scripts/request.js";
$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron");
    window.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        console.log(bookcase);
        bookcase.start();
        window.modal.src="";
        cauldron.droppable({
            accept: ".item",
            activate: function( event, ui ) { cauldron[0].classList.add("highlight"); },
            deactivate: function( event, ui ) { cauldron[0].classList.remove("highlight"); },
            over: function( event, ui ) { cauldron[0].classList.add("placing"); },
            out: function( event, ui ) { cauldron[0].classList.remove("placing"); },
            drop: function( event, ui ) 
            { 
                const container = cauldron[0];
                container.classList.remove("highlight");
                container.classList.remove("placing");
                if(!container.ingredients) container.ingredients = [];
                const itemid = ui.draggable[0].id;
                container.ingredients.push(itemid);
                console.log("Dropou objeto", container.ingredients); 
            }
        });
    }, 5000);

    //window.transition.stop();
});

