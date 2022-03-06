//import { Request } from "../scripts/request.js";
$(document).ready(function() 
{
    const bookcase = $("#bookcase")[0];
    const cauldron = $("#cauldron");
    if(window.modal) window.modal.src="modules/windows/stage";
    setTimeout(() => 
    {
        console.log(bookcase);
        if(window.modal){
            bookcase.start();
            window.modal.src="";
        }
        cauldron.droppable({
            accept: ".item",
            activate: function( event, ui ) { cauldron[0].classList.add("highlight"); },
            deactivate: function( event, ui ) { cauldron[0].classList.remove("highlight"); },
            over: function( event, ui ) { cauldron[0].classList.add("placing"); ui.helper[0].classList.add("ui-draggable-dropping"); }, //
            out: function( event, ui ) { cauldron[0].classList.remove("placing"); ui.helper[0].classList.remove("ui-draggable-dropping"); }, //
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

